import { logger, hypersignSDK, whitelistingSchemaId, nodeServer } from "../config";
import { Request, Response } from "express";
import InvestorModel, { IInvestor } from "../models/investor";

const { keys: issuerKeyPair } = require("../../hypersign.json");

async function addInvestor(req: Request, res: Response) {
  try {
    const { did, email, name, ethAddress, twitterHandle, telegramHandle, hasTwitted, hasJoinedTGgroup,  projectId, tweetUrl  } = req.body;
    
    const investor:IInvestor = await InvestorModel.where({ did: did, projectId: projectId }).findOne();

    const investor_email:IInvestor = await InvestorModel.where({ email: email, projectId: projectId }).findOne();

    if(investor != null){
      return res.status(400).send("More than one submition is not allowed from this did");
    }

    if(investor_email != null){
      return res.status(400).send("More than one submition is not allowed from this emailId");
    }

    const newEmp: IInvestor = await InvestorModel.create({
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
    res.send(newEmp);
  } catch (e) {
    logger.error("InvestorCtrl:: addInvestor(): Error " + e);
    res.status(500).send(e.message);
  }
}

async function getAllInvestor(req: Request, res: Response) {
  try {
    const employeeList:Array<IInvestor> = await InvestorModel.find({});
    res.send(employeeList);
  } catch (e) {
    logger.error('InvestorCtrl:: getAllInvestor(): Error ' + e);
    res.status(500).send(e.message);
  }
}

async function getInvestorByDID(req: Request, res: Response) {
  try {
    const { did } = req.params;
    const investors:Array<IInvestor> = await InvestorModel.where({did: did}).find(); // one investor can participate into multiple projects
    res.send(investors);
  } catch (e) {
    logger.error('InvestorCtrl:: getInvestorByDID(): Error ' + e);
    res.status(500).send(e.message);
  }
}

async function updateInvestor(req: Request, res: Response){
  try{
    const { did  } = req.params;
    const projectId: any = req.query.projectId;

    if(!did){
      return res.status(400).send("Investor did must be passed"); 
    }

    if(!projectId){
      return res.status(400).send("ProjectId must be passed in query"); 
    }

    const filter = { did, projectId };
    const update = req.body;
    const opts = { new: true };
    const updatedInvetor: IInvestor = await InvestorModel.findOneAndUpdate(filter, update, opts);

    if(!updatedInvetor){
      return res.status(400).send("No investor found"); 
    }

    res.send(updatedInvetor);

  } catch (e){
    logger.error('InvestorCtrl:: updateInvestor(): Error ' + e);
    res.status(500).send(e.message);  
  }
}

async function issueCredential(req: Request, res: Response){
  try{
    
    const { did: subjectDid,  projectId  } = req.body;

    const investor:IInvestor = await InvestorModel.where({ did: subjectDid, projectId: projectId }).findOne();

    if(!investor || !investor["_doc"]){
      return res.status(400).send("No investor found");
    }

    if(!(investor.hasTwitted && investor.hasJoinedTGgroup && investor.isVerificationComplete)){
      return res.status(400).send("Investor has not yet verifed");
    }

    const schemaUrl = nodeServer.baseURl + nodeServer.schemaGetEp + whitelistingSchemaId;
    let attributesMap = {
      name: "",
      email: "",
      ethAddress: "",
      twitterHandle: "",
      telegramHandle: ""
    }

    Object.keys(attributesMap).map(x => {
      attributesMap[x] = investor["_doc"][x]
    })
    
    const rawCredential = await hypersignSDK.credential.generateCredential(schemaUrl, {
      subjectDid,
      issuerDid: issuerKeyPair.publicKey.id,
      expirationDate: new Date().toISOString(),
      attributesMap
    })

    const signedCredential = await hypersignSDK.credential.signCredential(rawCredential, issuerKeyPair.publicKey.id, issuerKeyPair.privateKeyBase58)
    res.send(signedCredential)


  } catch (e){
    logger.error('InvestorCtrl:: verifyAndIssueCredential(): Error ' + e);
    res.status(500).send(e.message);
  }

}

export default {
  addInvestor,
  getInvestorByDID,
  getAllInvestor,
  issueCredential,
  updateInvestor
};

