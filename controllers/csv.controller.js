const db = require("../models");
var fs = require('fs').promises;
const csv = require("csv-parse/sync");

const Faculty = db.faculty;
const Section = db.section;
const Room = db.room;
const Course = db.course;
const Semester = db.semester;

let facultyDatabase = [], sectionDatabase = [], roomDatabase = [], courseDatabase = [], semesterDatabase = [];

exports.upload = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }

  try {
    await loadData();

    let fileContent = await fs.readFile("resources/static/assets/uploads/" + req.file.filename);
    const records = csv.parse(fileContent, {columns: true});

    for(let index = 0; index < records.length; index++) {
      let row = records[index];

      //Faculty
      const facultyId = await findFacultyId(row["Faculty Name (LFM)"]);

      //Course?

      //Semester?

      //Room

      //Section

      //FacultySection

      //SectionTimes
    }

    res.status(200).send({
      message:
        "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "There was a problem uploading the file: " + req.file.originalname,
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

async function findFacultyId(input) {
  var lName = input.substring(0,input.indexOf(","));
  var fName = input.substring(input.indexOf(",") + 2, input.lastIndexOf(" "));
  var tempFaculty = facultyDatabase.find(fac => fac.fName === fName && fac.lName === lName);

  if(tempFaculty === null || tempFaculty === undefined) {
    const faculty = {
      fName: fName,
      lName: lName
    };

    await Faculty.create(faculty)
    .then(data => {
      tempFaculty = data.dataValues;
      facultyDatabase.push(tempFaculty);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  return tempFaculty.id;
};