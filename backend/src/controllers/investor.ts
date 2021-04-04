import { logger } from "../config";
import { Request, Response } from "express";
import InvestorModel, { IInvestor } from "../models/investor";

async function addInvestor(req: Request, res: Response) {
  try {
    const { did, email, name, ethAddress, twitterHandle, telegramHandle, hasTwitted, hasJoinedTGgroup,  projectId, tweetUrl  } = req.body;
    // if (firstName == "" || lastName == "" || email == "" || role == "" || dob == "")
    //   res
    //     .status(400)
    //     .send("firstName, lastName, email, role fields are mandatory");

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

