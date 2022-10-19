const db = require("../models");
const fs = require("fs");
const csv = require("fast-csv");

const Faculty = db.faculty;
const Section = db.section;
const Room = db.room;
const Course = db.course;
const Semester = db.semester;

let facultyDatabase = [], sectionDatabase = [], roomDatabase = [], courseDatabase = [], semesterDatabase = [];

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let path = "resources/static/assets/uploads/" + req.file.filename;

    //fill arrays with data from database
    await loadData();

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        //Faculty
        const facultyId = findFacultyId(row);

        //Course?

        //Semester?

        //Room

        //Section

        //FacultySection

        //SectionTimes
      })
      .on("end", () => {
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

        res.status(200).send({
          message:
            "Uploaded the file successfully: " + req.file.originalname,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

async function loadData() {
  await Faculty.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        facultyDatabase.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });
  

  await Section.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        sectionDatabase.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Room.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        roomDatabase.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Course.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        courseDatabase.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Semester.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        semesterDatabase.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });
};

function findFacultyId(row) {
  var id;
  var rowFName = row.fName;
  var rowLName = row.lName;

  console.log(row);

  return id;
};