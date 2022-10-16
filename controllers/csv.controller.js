const db = require("../models");
//const Tutorial = db.tutorials;

const fs = require("fs");
const csv = require("fast-csv");

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let tutorials = [];
    let path = "resources/static/assets/uploads/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        //tutorials.push(row);
        //console.log("read a row");
      })
      .on("end", () => {
        console.log("read the file");
        // Tutorial.bulkCreate(tutorials)
        //   .then(() => {
        //     res.status(200).send({
        //       message:
        //         "Uploaded the file successfully: " + req.file.originalname,
        //     });
        //   })
        //   .catch((error) => {
        //     res.status(500).send({
        //       message: "Fail to import data into database!",
        //       error: error.message,
        //     });
        //   });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

// module.exports = {
//   upload
//   //getTutorials
// };

//***************************** */
// var fs = require('fs').promises;
// var parse = require('csv-parse/sync');
// const { readFile } = require('fs');

// readFile = () => {
//     const fileContent = fs.readFile('data.csv');
//     const data = parse.parse(fileContent, {columns: true});
//     //console.log(data[25])
//     findRoomId(data[25].Bldg+"-"+data[25].Room);
// };

// function findRoomId(roomNum) {
    
// };