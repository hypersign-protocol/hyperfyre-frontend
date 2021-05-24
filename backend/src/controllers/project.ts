import { logger } from "../config";
import { Request, Response } from "express";
import ProjectModel, { IProject } from "../models/project";
import InvestorModel, { IInvestor } from "../models/investor";

async function addProject(req: Request, res: Response) {
  try {
    const {
      projectName,
      logoUrl,
      fromDate,
      toDate,
      ownerDid,
      twitterHandle,
      telegramHandle,
      twitterPostFormat,
      userData
    } = req.body;

    console.log(userData);

    if (
      projectName == "" ||
      logoUrl == "" ||
      fromDate == "" ||
      toDate == "" ||
      twitterPostFormat == ""
    ) {
      res.statusMessage =
        "projectName, logoUrl, fromDate, toDate can not be empty";
      return res.status(400).end();
    }

    if (isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
      res.statusMessage = "Invalid fromDate or toDate";
      return res.status(400).end();
    }

    if (Date.parse(fromDate) > Date.parse(toDate)) {
      res.statusMessage = "fromDate can not be greater than toDate";
      return res.status(400).end();
    }

    const newProject: IProject = await ProjectModel.create({
      projectName,
      logoUrl,
      fromDate,
      toDate,
      ownerDid: userData.id,
      twitterHandle,
      telegramHandle,
      twitterPostFormat
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
    const { owner } = req.query;
    const { userData } = req.body;
    let employeeList: Array<IProject>;
    if ( userData.id ) {
      employeeList = await ProjectModel.find({}).where({ ownerDid: userData.id });
    } else {
      employeeList = []// await ProjectModel.find({});
    }
    res.send(employeeList);
  } catch (e) {
    logger.error("InvestorCtrl:: getAllProject(): Error " + e);
    res.statusMessage = e.message;
    res.status(500).send(e.message);
  }
}

async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { fetchInvestors, limit, skip, searchQuery, isPublic } = req.query;
    const project: IProject = await ProjectModel.findById({ _id: id });

    if (project == null) {
      res.statusMessage = "No project found for id = " + id;
      return res.status(400).end();
    }

    let projectInfo = {
      ...project["_doc"],
    };

    if ((fetchInvestors) && (!isPublic)) {
      if (searchQuery) {
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(searchQuery);

        var queryOptions = {
          $or: [
            { name: { $regex: searchRgx, $options: "i" } },
            { email: { $regex: searchRgx, $options: "i" } },
            { ethAddress: { $regex: searchRgx, $options: "i" } },
          ],
        };

        const investorList: Array<IInvestor> = await InvestorModel.where({
          projectId: id,
        }).find(queryOptions);

        projectInfo.investors = investorList;
        projectInfo.count = await InvestorModel.countDocuments({
          projectId: id,
        }).then((count) => count);
      } else {
        const limitInt = limit ? parseInt(limit.toString()) : 100;
        const skipInt = skip ? parseInt(skip.toString()) : 0;
        const investorList: Array<IInvestor> = await InvestorModel.where({
          projectId: id,
        })
          .find()
          .limit(limitInt)
          .skip(skipInt);
        projectInfo.investors = investorList;

        projectInfo.count = await InvestorModel.countDocuments({
          projectId: id,
        }).then((count) => count);
      }
    }
    res.send(projectInfo);
  } catch (e) {
    logger.error("InvestorCtrl:: getProjectById(): Error " + e);
    res.statusMessage = e.message;
    res.status(500).send(e.message);
  }
}

async function deleteProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const project: IProject = await ProjectModel.findByIdAndDelete(id);
    res.send({
      ...project["_doc"],
    });
  } catch (e) {
    logger.error("InvestorCtrl:: deleteProjectById(): Error " + e);
    res.statusMessage = e.message;
    res.status(500).send(e.message);
  }
}

async function updateProject(req: Request, res: Response) {
  try {
    const {
      projectName,
      logoUrl,
      fromDate,
      toDate,
      twitterHandle,
      telegramHandle,
      _id,
      userData
    } = req.body;

    const { id: ownerDid } = userData;

    // FindbyIdupdate returns the old object, however the value has been updated in the db
    await ProjectModel.findByIdAndUpdate(_id, {
      projectName,
      logoUrl,
      fromDate,
      toDate,
      ownerDid,
      twitterHandle,
      telegramHandle,
    });
    const project: IProject = await ProjectModel.findById({ _id: _id });

    res.send({
      ...project["_doc"],
    });
  } catch (e) {
    logger.error("InvestorCtrl:: updateProject(): Error " + e);
    res.statusMessage = e.message;
    res.status(500).send(e.message);
  }
}

export default {
  addProject,
  getProjectById,
  getAllProject,
  updateProject,
  deleteProjectById,
};
