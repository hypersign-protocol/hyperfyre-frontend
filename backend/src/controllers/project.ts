import { logger } from "../config";
import { Request, Response, NextFunction } from "express";
import ProjectModel, { IProject } from "../models/project";
import InvestorModel, { IInvestor } from "../models/investor";
import ApiError from '../error/apiError';
import { writeInvestorsToFile, deleteFile } from '../utils/files';

async function addProject(req: Request, res: Response, next: NextFunction) {
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
      userData,
      telegramAnnouncementChannel
    } = req.body;

    // if (
    //   projectName == "" ||
    //   logoUrl == "" ||
    //   fromDate == "" ||
    //   toDate == "" ||
    //   twitterPostFormat == ""
    // ) {
    //   res.statusMessage =
    //     "projectName, logoUrl, fromDate, toDate can not be empty";
    //   return res.status(400).end();
    // }

    // if (isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
    //   res.statusMessage = "Invalid fromDate or toDate";
    //   return res.status(400).end();
    // }

    if (Date.parse(fromDate) > Date.parse(toDate)) {
      return next(ApiError.badRequest("fromDate can not be greater than toDate"));
    }

    const newProject: IProject = await ProjectModel.create({
      projectName,
      logoUrl,
      fromDate,
      toDate,
      ownerDid: userData.id,
      twitterHandle,
      telegramHandle,
      twitterPostFormat,
      projectStatus: true,
      telegramAnnouncementChannel
    });
    res.send(newProject);
  } catch (e) {
    logger.error("ProjectCtrl:: addProject(): Error " + e);
    return next(ApiError.internal(e.message));
  }
}

async function getAllProject(req: Request, res: Response, next: NextFunction) {
  try {
    const { owner } = req.query;
    const { userData } = req.body;
    let projectList: Array<IProject>;
    let projectListTmp = [];
    if ( userData.id ) {
      projectList = await ProjectModel.find({}).where({ ownerDid: userData.id });

      projectList.forEach((project: IProject) => {
        if(checkUpdateIfProjectExpired(project)){
          logger.info("Project is expired");
          logger.info(project);
          project.projectStatus = false; 
        }
        projectListTmp.push(project);
      });
    } else {
      projectList = []// await ProjectModel.find({});
    }
    res.send(projectListTmp);
  } catch (e) {
    logger.error("ProjectCtrl:: getAllProject(): Error " + e);
    return next(ApiError.internal(e.message));
  }
}

function checkUpdateIfProjectExpired(projectInfo: IProject){
  if(!projectInfo){
    throw new Error("Invaild project info object")
  }
  
  if(projectInfo.projectStatus){
    if(new Date().getTime() > Date.parse(projectInfo.toDate)){
      projectInfo.projectStatus = false;
      // update the project in background
      ProjectModel.findByIdAndUpdate(projectInfo._id, { ...projectInfo });
      return true;
    }else{
    return false;
    }  
  }else{
    return false;
  }
}

async function getProjectById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const { fetchInvestors, limit, skip, searchQuery, isPublic, isExport } = req.query;
    const project: IProject = await ProjectModel.findById({ _id: id });

    if (project == null) {
      return next(ApiError.badRequest("No project found for id = " + id));
    }

    let projectInfo = {
      ...project["_doc"],
    };

    if(checkUpdateIfProjectExpired(projectInfo)){
      logger.info("Project is expired");
      logger.info(projectInfo);
      projectInfo.projectStatus = false; 
    }
    //// Implement project expiry
    // If currentTime is more than that

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

        // check if export option is enabled
        // if yes then
        // create excel sheet
        // write investors data to it
        // send the file in the UI and return here.
        if(isExport){
          const filePath = await writeInvestorsToFile(`${id}_investorList_${new Date().getTime()}`, investorList);
          if(filePath){
            res.sendFile(filePath, ()=>{
              // delete the file when tranfer is complete.
              deleteFile(filePath);
            });
            return;
          }
        }
      }
    }
    res.send(projectInfo);
  } catch (e) {
    logger.error("ProjectCtrl:: getProjectById(): Error " + e);
    return next(ApiError.internal(e.message));
  }
}

async function deleteProjectById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const project: IProject = await ProjectModel.findByIdAndDelete(id);
    res.send({
      ...project["_doc"],
    });
  } catch (e) {
    logger.error("ProjectCtrl:: deleteProjectById(): Error " + e);
    return next(ApiError.internal(e.message));
  }
}

async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      projectName,
      logoUrl,
      fromDate,
      toDate,
      twitterHandle,
      telegramHandle,
      twitterPostFormat,
      _id,
      userData,
      projectStatus,
      telegramAnnouncementChannel
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
      twitterPostFormat,
      projectStatus,
      telegramAnnouncementChannel: !telegramAnnouncementChannel ? "" : telegramAnnouncementChannel
    });
    const project: IProject = await ProjectModel.findById({ _id: _id });

    if(new Date().getTime() > Date.parse(project.toDate)){
      return next(ApiError.badRequest("You can not edit the project information after project expiry"));
    }

    res.send({
      ...project["_doc"],
    });
  } catch (e) {
    logger.error("ProjectCtrl:: updateProject(): Error " + e);
    return next(ApiError.internal(e.message));
  }
}



async function getRandomInvestors(req: Request, res: Response, next: NextFunction) {

  try{

    let { limitRecord } = req.query;
    const { id } = req.params;

    if(!limitRecord || limitRecord == ""){
      limitRecord = "1";
    } 
    console.log(limitRecord.toString());
    let limitRecordInt = parseInt(limitRecord.toString());
    
    // get count of total investors for this projectId
    // query: projectId, isVerificationComplete = true
    // check limitRecord < investorCount
    const query = { projectId: id,isVerificationComplete: true };
    const investorCount = await InvestorModel.countDocuments(query).then((count) => count);

    if(investorCount == 0){
      return next(ApiError.badRequest("no record found for this project to perform lottery"));
    }

    if(limitRecordInt > investorCount){
      return next(ApiError.badRequest("lottery can not be executed for records more than total verified records"));
    }
    let randomInvestorList: Array<IInvestor> = [];
    
    if(limitRecordInt == investorCount){
      randomInvestorList = await InvestorModel.where(query).find();
    }

    randomInvestorList =  await InvestorModel.aggregate([
      { $match: query },
      { $sample: { size: limitRecordInt } }
    ])    


    const filePath = await writeInvestorsToFile(`${id}_investorList_${new Date().getTime()}`, randomInvestorList);
    if(filePath){
      res.sendFile(filePath, ()=>{
        // delete the file when tranfer is complete.
        deleteFile(filePath);
      });
      return;
    }

    

  }catch(e){
    logger.error("ProjectCtrl:: getRandomInvestors(): Error " + e);
    return next(ApiError.internal(e.message));
  }


}
  


export default {
  addProject,
  getProjectById,
  getAllProject,
  updateProject,
  deleteProjectById,
  getRandomInvestors
};
