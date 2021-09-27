import excel from "exceljs";
import path from "path";
import fs from "fs";
import { IInvestor } from "../models/investor";
import { IEventAction } from "../models/actions";
import { logger } from "../config";

const folder = "temp";
export function writeInvestorsToFile(
  filename: string,
  data: Array<any>
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
          let wkCol = [
            { header: "EVENTID", key: "projectId", width: 20 },
            { header: "DID", key: "did", width: 30 },
            { header: "EMAIL", key: "email", width: 30 },
            { header: "NAME", key: "name", width: 30 },
            { header: "SCORE", key: "numberOfReferals",   width: 10 },
          ];

          data = data.map((investor: IInvestor) => {
            if(investor.actions && investor.actions.length > 0){
              console.log(investor.actions.length)
              investor.actions.forEach((action: IEventAction) => {
                wkCol.push({
                  header: action.title.toUpperCase(),
                  key: action._id,
                  width: 30
                })
                investor[action["_id"]] = action.value;  
              })
            }else{
              // no action configured
            }
            return investor;
          });  
            
          worksheet.columns = wkCol;

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