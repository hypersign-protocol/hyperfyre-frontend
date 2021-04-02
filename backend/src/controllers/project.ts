import { logger } from "../config";
import { Request, Response } from "express";
import ProjectModel, { IProject } from "../models/project";

async function addProject(req: Request, res: Response) {
  try {
    const { projectName, logoUrl, fromDate, toDate, ownerDid } = req.body;

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
      projectName, logoUrl, fromDate, toDate, ownerDid
    });
    res.send(newProject);
  } catch (e) {
    logger.error("ProjectCtrl:: addProject(): Error " + e);
    res.status(500).send(e.message);
  }
}

async function getAllProject(req: Request, res: Response) {
  try {
    const employeeList:Array<IProject> = await ProjectModel.find({});
    res.send(employeeList);
  } catch (e) {
    logger.error('InvestorCtrl:: getAllProject(): Error ' + e);
    res.status(500).send(e.message);
  }
}

async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const investor:IProject = await ProjectModel.findById({ _id: id})
    res.send(investor);
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
