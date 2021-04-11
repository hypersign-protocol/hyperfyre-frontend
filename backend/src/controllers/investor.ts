import { logger } from "../config";
import { Request, Response } from "express";
import InvestorModel, { IInvestor } from "../models/investor";

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
    const investor:IInvestor = await InvestorModel.where({did: did}).findOne();
    res.send(investor);
  } catch (e) {
    logger.error('InvestorCtrl:: getInvestorByDID(): Error ' + e);
    res.status(500).send(e.message);
  }
}

export default {
  addInvestor,
  getInvestorByDID,
  getAllInvestor
};

