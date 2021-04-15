import { logger } from "../config";
import { Request, Response } from "express";
import ProjectModel, { IProject } from "../models/project";
import InvestorModel, {IInvestor} from "../models/investor";

async function addProject(req: Request, res: Response) {
  try {
    const { projectName, logoUrl, fromDate, toDate, ownerDid, twitterHandle,  telegramHandle } = req.body;

    if (projectName == "" || logoUrl == "" || fromDate == "" || toDate == "" || ownerDid == ""){
      res.statusMessage = "projectName, logoUrl, fromDate, toDate can not be empty"
      return res.status(400).end();
    }

    if(isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))){
      res.statusMessage = "Invalid fromDate or toDate"
      return res.status(400).end();
    }

    if(Date.parse(fromDate) > Date.parse(toDate)){
      res.statusMessage = "fromDate can not be greater than toDate"
      return res.status(400).end()
    }


    const newProject: IProject = await ProjectModel.create({
      projectName, logoUrl, fromDate, toDate, ownerDid, twitterHandle,  telegramHandle 
    });
    res.send(newProject);
  } catch (e) {
    logger.error("ProjectCtrl:: addProject(): Error " + e);
    res.statusMessage = e.message;
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
    res.statusMessage = e.message
    res.status(500).send(e.message);
  }
}

async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const { fetchInvestors, limit } =  req.query;
    const project: IProject = await ProjectModel.findById({ _id: id})    
    
    if(project == null) {
      res.statusMessage = "No project found for id = " + id;
      return res.status(400).end();
    }

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
    res.statusMessage = e.message
    res.status(500).send(e.message);
  }
}

async function deleteProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const project:IProject = await ProjectModel.findByIdAndDelete(id)
    res.send({
      ...project["_doc"]
    });
  } catch (e) {
    logger.error('InvestorCtrl:: deleteProjectById(): Error ' + e);
    res.statusMessage = e.message
    res.status(500).send(e.message);
  }
}


async function updateProject(req: Request, res: Response) {
  try {
    const { projectName, logoUrl, fromDate, toDate, ownerDid, twitterHandle,  telegramHandle, _id } = req.body;
    
    // FindbyIdupdate returns the old object, however the value has been updated in the db
    await ProjectModel.findByIdAndUpdate(_id, {projectName, logoUrl, fromDate, toDate, ownerDid, twitterHandle,  telegramHandle});
    const project: IProject = await ProjectModel.findById({ _id: _id});
    
    res.send({
      ...project["_doc"]
    });
  } catch (e) {
    logger.error('InvestorCtrl:: updateProject(): Error ' + e);
    res.statusMessage = e.message
    res.status(500).send(e.message);
  }
}


export default {
  addProject,
  getProjectById,
  getAllProject,
  updateProject,
  deleteProjectById
};
