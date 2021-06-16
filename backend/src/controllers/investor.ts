import { logger, hypersignSDK, whitelistingSchemaId, nodeServer, hostnameurl, hsAuthServerEp } from "../config";
import { Request, Response, NextFunction } from "express";
import InvestorModel, { IInvestor } from "../models/investor";
let { template :credentialMailTemplate} = require('../services/mail.template');
import MailService from '../services/mail.service';
import ApiError from '../error/apiError';


const jsonWebToken = require('jsonwebtoken');

const { keys: issuerKeyPair,  mail, jwt } = require("../../hypersign.json");

async function addInvestor(req: Request, res: Response, next: NextFunction) {
  try {
    
    const { did, email, name, ethAddress, twitterHandle, telegramHandle, hasTwitted, hasJoinedTGgroup,  projectId, tweetUrl  } = req.body;
    
    const investor:IInvestor = await InvestorModel.where({ did: did, projectId: projectId }).findOne();

    const investor_email:IInvestor = await InvestorModel.where({ email: email, projectId: projectId }).findOne();

    if(investor != null){ 
      return next(ApiError.badRequest('More than one submition is not allowed from this did'));
    }

    if(investor_email != null){
      return next(ApiError.badRequest('More than one submition is not allowed from this emailId'));
    }

    const new_investor: IInvestor = await InvestorModel.create({
      did, 
      email, 
      name, 
      ethAddress, 
      twitterHandle, 
      telegramHandle, 
      hasTwitted, 
      hasJoinedTGgroup, 
      isVerfiedByHypersign : false,
      isVerificationComplete : false,
      projectId,
      tweetUrl
    });

    res.send(new_investor);
  } catch (e) {
    logger.error("InvestorCtrl:: addInvestor(): Error " + e);
    return next(ApiError.internal(e.message));
  }
}

async function getAllInvestor(req: Request, res: Response, next: NextFunction) {
  try {
    const employeeList:Array<IInvestor> = await InvestorModel.find(req.query);
    res.send(employeeList);
  } catch (e) {
    logger.error('InvestorCtrl:: getAllInvestor(): Error ' + e);
    return next(ApiError.internal(e.message));
  }
}

async function getInvestorByDID(req: Request, res: Response, next: NextFunction) {
  try {
    const { did } = req.params;
    
    // if(!did) {
    //   res.statusMessage = "Please pass the did in the paramater";
    //   res.status(400).end()
    // }

    const investors:Array<IInvestor> = await InvestorModel.where({did: did}).find(); // one investor can participate into multiple projects
    res.send(investors);
  } catch (e) {
    logger.error('InvestorCtrl:: getInvestorByDID(): Error ' + e);
    return next(ApiError.internal(e.message));
  }
}

async function updateInvestorInDb(filter, updateParams){

  const opts = { new: true, useFindAndModify: true };
  
  const investor: IInvestor = await InvestorModel.findOneAndUpdate(filter, updateParams, opts);

  if(!investor){
    throw new Error("No investor found")
  }
  return investor;

}

async function updateInvestor(req: Request, res: Response, next: NextFunction){
  try{
    const { did  } = req.params;
    const projectId: any = req.query.projectId;

    ///// Do all validation in middleware using express-validator
    /////////////////////////
    // if(!did){
    //   res.statusMessage = "Investor did must be passed";      
    //   return res.status(400).end();
    // }

    // if(!projectId){
    //   res.statusMessage = "ProjectId must be passed in query";
    //   return res.status(400).end();
    // }
    /////////////////////////

    const filter = { did, projectId };
    const updateParams = req.body;
    
    const updatedInvetor1 = await updateInvestorInDb(filter, updateParams);
    
    res.send(updatedInvetor1);

  } catch (e){
    logger.error('InvestorCtrl:: updateInvestor(): Error ' + e);
    return next(ApiError.internal(e.message)); 
  }
}

async function getCredential(req: Request, res: Response, next: NextFunction) {
  try{

    const { token } =  req.query;

    if(!token){
      return next(ApiError.badRequest("WT token is not passed in query params"));
    }
    const attributesMap = await jsonWebToken.verify(token, jwt.secret);

    if(!attributesMap){
      return next(ApiError.badRequest("Could not verify JWT token"));
    }
  
    const { did, projectId } = attributesMap;
    delete attributesMap["did"];
    delete attributesMap["projectId"];
    delete attributesMap["iat"];
    delete attributesMap["exp"];

    const schemaUrl = nodeServer.baseURl + nodeServer.schemaGetEp + whitelistingSchemaId;

    const rawCredential = await hypersignSDK.credential.generateCredential(schemaUrl, {
      subjectDid: did,
      issuerDid: issuerKeyPair.publicKey.id,
      expirationDate: new Date().toISOString(),
      attributesMap
    })

    const signedCredential = await hypersignSDK.credential.signCredential(rawCredential, issuerKeyPair.publicKey.id, issuerKeyPair.privateKeyBase58)
    res.send({
      status: 200,
      message:signedCredential,
      error: null
    });



    // Finally (in backgroud) update that this investor is verifed by Hypersign
    const filter = { did, projectId };
    const updateParams = { isVerfiedByHypersign: true };
    updateInvestorInDb(filter, updateParams);

  } catch (e){
    logger.error('InvestorCtrl:: verifyAndIssueCredential(): Error ' + e);
    return next(ApiError.internal(e.message));
  }

}


async function sendEmail(data){
  const token = await jsonWebToken.sign(data, jwt.secret, { expiresIn: jwt.expiryTime })
  let link = `${hostnameurl}/api/v1/investors/credential?token=${token}`;
  let mailTemplateTemp = credentialMailTemplate;
  mailTemplateTemp = mailTemplateTemp.replace(/@@APPNAME@@/g, mail.name);
  mailTemplateTemp = mailTemplateTemp.replace('@@RECEIVERNAME@@', data.name);
  mailTemplateTemp = mailTemplateTemp.replace('@@LINK@@', link);
  const JSONdata = JSON.stringify({
      QRType: 'ISSUE_CRED',
      url: link
  });
  const deepLinkUrl = encodeURI(hsAuthServerEp + 'deeplink.html?deeplink=hypersign:deeplink?url=' + JSONdata);
  mailTemplateTemp = mailTemplateTemp.replace("@@DEEPLINKURL@@", deepLinkUrl);
  mailTemplateTemp = mailTemplateTemp.replace("@@URLTEXT@@", deepLinkUrl);

  const mailService = new MailService({ ...mail });
  await mailService.sendEmail(data.email, mailTemplateTemp, `Congratulations! You are successfully verified with Hypersign`);
  return link;
}


async function issueCredential(req: Request, res: Response, next: NextFunction){
  try{
    
    const { did,  projectId  } = req.body;

    const investor:IInvestor = await InvestorModel.where({ did: did, projectId: projectId }).findOne();

    if(!investor || !investor["_doc"]){
      return next(ApiError.badRequest("no investor foun"));
    }

    if(!(investor.hasTwitted && investor.hasJoinedTGgroup && investor.isVerificationComplete)){
      return next(ApiError.badRequest("Investor has not yet verifed"));
    }

    if(investor && investor.isVerfiedByHypersign === true){
      return next(ApiError.badRequest("Investor has already been verifed"));
    }

    let attributesMap = {
      name: "",
      email: "",
      ethAddress: "",
      twitterHandle: "",
      telegramHandle: "",
      did: "",
      projectId: ""
    }

    Object.keys(attributesMap).map(x => {
      attributesMap[x] = investor["_doc"][x]
    })
      
    const link = await sendEmail(attributesMap);
    return res.send({message: "Whitelisting credential has been successfully sent to the investor email", credentialUrl: link})

  } catch (e){
    logger.error('InvestorCtrl:: verifyAndIssueCredential(): Error ' + e);
    return next(ApiError.internal(e.message));
  }

}

export default {
  addInvestor,
  getInvestorByDID,
  getAllInvestor,
  issueCredential,
  updateInvestor,
  getCredential
}

