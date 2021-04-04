import { logger } from "../config";
import { Request, Response } from "express";
import ProjectModel, { IProject } from "../models/project";
import InvestorModel, {IInvestor} from "../models/investor";

async function addProject(req: Request, res: Response) {
  try {
    const { projectName, logoUrl, fromDate, toDate, ownerDid, twitterHandle,  telegramHandle } = req.body;

    // if(isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))){
    //     res
    //     .status(400)
    //     .send("Invalid from or to date");

    //     return;
    // }

    // if(Date.parse(fromDate) > Date.parse(toDate)){
    //   res
    //     .status(400)
    //     .send("From date can not be greater than to date")
      
    //     return;
    // }

    

    // if (firstName == "" || lastName == "" || email == "" || role == "" || dob == "")
    //   res
    //     .status(400)
    //     .send("firstName, lastName, email, role fields are mandatory");

    const newProject: IProject = await ProjectModel.create({
      projectName, logoUrl, fromDate, toDate, ownerDid, twitterHandle,  telegramHandle 
    });
    res.send(newProject);
  } catch (e) {
    logger.error("ProjectCtrl:: addProject(): Error " + e);
    res.status(500).send(e.message);
  }
}

async function getAllProject(req: Request, res: Response) {
  try {
    const {owner} = req.query;
    let employeeList:Array<IProject>;
    if(owner){
      employeeList = await ProjectModel.find({}).where({ownerDid: owner});
    }else{
      employeeList = await ProjectModel.find({});
    }
    res.send(employeeList);
  } catch (e) {
    logger.error('InvestorCtrl:: getAllProject(): Error ' + e);
    res.status(500).send(e.message);
  }
}

async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { fetchInvestors, limit } =  req.query;
    const project:IProject = await ProjectModel.findById({ _id: id})
    let projectInfo = {
      ...project["_doc"]
    }
    if(fetchInvestors){
      const limitInt = limit? parseInt(limit.toString()) : 100;
      const investorList:Array<IInvestor> =  await InvestorModel.where({projectId: id}).find().limit(limitInt);
      projectInfo.investors = investorList;
    }
    
    res.send(projectInfo);
  } catch (e) {
    logger.error('InvestorCtrl:: getProjectById(): Error ' + e);
    res.status(500).send(e.message);
  }
}

export default {
  addProject,
  getProjectById,
  getAllProject
};
