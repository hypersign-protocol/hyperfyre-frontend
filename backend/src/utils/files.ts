import excel from "exceljs";
import path from "path";
import fs from "fs";
import { IInvestor } from "../models/investor";
import { logger } from "../config";

const folder = "temp";
export function writeInvestorsToFile(
  filename: string,
  data: Array<IInvestor>
): Promise<string> {
  return new Promise(async (resolve, reject) => {
      try{
        if (!filename || filename == "") {
            return reject("Error: filename can not be null or empty");
          }
          if (!data || data.length == 0) {
            return reject("Error: data is null or empty");
          }
          
          let workbook = new excel.Workbook(); //creating workbook
          let worksheet = workbook.addWorksheet("Investors"); //creating worksheet
      
          worksheet.columns = [
            { header: "PROJECT ID", key: "projectId", width: 20 },
            { header: "DID", key: "did", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "NAME", key: "name", width: 30 },
            { header: "BLOCKCHAIN ADDRESS", key: "ethAddress", width: 30 },
            { header: "TWEETER HANDLE", key: "twitterHandle", width: 20 },
            { header: "TELEGRAM HANDLE", key: "telegramHandle", width: 20 },
            { header: "SCORE", key: "numberOfReferals",   width: 10 },     
            { header: "TWEET URL", key: "tweetUrl", width: 40 },
          ];
      
          worksheet.addRows(data);
          worksheet.getRow(1).font = {bold: true}
      
          const fname = path.join(folder, filename + ".csv");
          logger.info("File.ts:: writeInvestorsToFile(): fname = "+ fname);

          await workbook.csv.writeFile(fname);
          
          const filePath = path.resolve(__dirname,"../../" , fname);
          logger.info("File.ts:: writeInvestorsToFile(): filePath = "+ filePath);
          resolve(filePath);
      }catch(e){
          reject(e)
      }
  });
}


export function deleteFile(filePath){
    if(filePath){
        fs.unlink(filePath, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}