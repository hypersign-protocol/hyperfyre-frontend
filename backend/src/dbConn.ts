import mongoose from "mongoose";
import { dbConnUrl } from "./config";

function closeConnection(){
  return mongoose.connection.close();
}

function openConnection() {
  return new Promise((resolve, reject) => {
    if (dbConnUrl) {
      mongoose.connect(
        dbConnUrl,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
          if (err) {
            reject("Error: could not connect to mongo database. Conn URL = " + dbConnUrl);
          } else {
            resolve("Successfully opened connection to mongo database");
          }
        }
      );
    } else {
      reject("dbConnUrl is null or empty");
    }
  })
}


export default {
  openConnection,
  closeConnection
}