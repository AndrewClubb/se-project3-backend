const db = require("../models");
var fs = require('fs').promises;
const csv = require("csv-parse/sync");

const Faculty = db.faculty;
const Section = db.section;
const Room = db.room;
const Course = db.course;
const Semester = db.semester;
const FacultySection = db.facultySection;
const SectionTime = db.sectionTime;

let facultyArray = [], sectionArray = [], roomArray = [], courseArray = [], semesterArray = [], facultySectionArray = [];

exports.upload = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }

  try {
    await loadData();

    let fileContent = await fs.readFile("resources/static/assets/uploads/" + req.file.filename);
    const records = csv.parse(fileContent, {columns: true});

    for(let rowIndex = 0; rowIndex < records.length; rowIndex++) {
      //General variables
      let row = records[rowIndex];
      let facultyId = 0, facultyId2 = 0, courseId = 0, sectionId = 0, roomId = 0, semesterId = 0;
      //Room variables
      let rowBldgArray = row["Bldg"].split(", ");
      let rowRoomArray = row["Room"].split(", ");
      //Section Time variables
      let rowStartTimeArray = row["Start Time 24hr"].split(", ");
      let rowEndTimeArray = row["End Time 24hr"].split(", ");
      let rowStartDateArray = row["Meeting Start Date"].split(", ");
      let rowEndDateArray = row["Meeting End Date"].split(", ");
      let rowSundayArray = row["Sun"].split(", ");
      let rowMondayArray = row["Mon"].split(", ");
      let rowTuesdayArray = row["Tue"].split(", ");
      let rowWednesdayArray = row["Wed"].split(", ");
      let rowThursdayArray = row["Thu"].split(", ");
      let rowFridayArray = row["Fri"].split(", ");
      let rowSaturdayArray = row["Sat"].split(", ");

      //Get faculty IDs
      facultyId = await findFacultyId(row["Faculty Name (LFM)"]);
      if (!row["Faculty Name 2 (LFM)"] === "") {
        facultyId2 = await findFacultyId(row["Faculty Name 2 (LFM)"]);
      }
      //Get course ID
      courseId = await findCourseId(row["Subject"],row["Course #"],row["Section Title"]);
      //Get semester ID
      semesterId = await findSemesterId(row["Term"]);
      //Get section ID
      sectionId = await findSectionId(row["Section #"], courseId, semesterId);

      //Generate facultySections
      await findFacultySectionId(facultyId, sectionId);
      if (facultyId2 != 0) {
        await findFacultySectionId(facultyId2, sectionId);
      }

      for(let varIndex = 0; varIndex < rowBldgArray.length; varIndex++) {
        //Get room ID
        roomId = await findRoomId(rowBldgArray[varIndex], rowRoomArray[varIndex]);        

        //SectionTimes
        await findSectionTimeId(rowStartTimeArray[varIndex], rowEndTimeArray[varIndex], rowStartDateArray[varIndex], rowEndDateArray[varIndex], 
          rowSundayArray[varIndex], rowMondayArray[varIndex], rowTuesdayArray[varIndex], rowWednesdayArray[varIndex], rowThursdayArray[varIndex], 
          rowFridayArray[varIndex], rowSaturdayArray[varIndex], sectionId, roomId)
      }
    }

    fs.unlink("resources/static/assets/uploads/" + req.file.filename);
    
    res.status(200).send({
      message:
        "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
    fs.unlink("resources/static/assets/uploads/" + req.file.filename);
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
        facultyArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });
  
    await FacultySection.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        facultySectionArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Section.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        sectionArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Room.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        roomArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Course.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        courseArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });

  await Semester.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        semesterArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });
};

async function findFacultyId(input) {
  var lName = input.substring(0,input.indexOf(","));
  var fName = input.substring(input.indexOf(",") + 2, input.lastIndexOf(" "));
  var tempFaculty = facultyArray.find(fac => fac.fName === fName && fac.lName === lName);

  if(tempFaculty === null || tempFaculty === undefined) {
    const faculty = {
      fName: fName,
      lName: lName
    };

    await Faculty.create(faculty)
    .then(data => {
      tempFaculty = data.dataValues;
      facultyArray.push(tempFaculty);
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  return tempFaculty.id;
};

async function findRoomId(inputBdlg, inputRoom) {
  var roomNumber = inputBdlg+"-"+inputRoom;

  var tempRoom = roomArray.find(room => room.number === roomNumber);
  if(tempRoom === null || tempRoom === undefined) {
    const room = {
      number: roomNumber
    };

    await Room.create(room)
    .then(data => {
      tempRoom = data.dataValues;
      roomArray.push(tempRoom);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return tempRoom.id;
}

async function findCourseId(inputSubject, inputCourseNum, inputTitle) {
  var courseNumber = inputSubject+"-"+inputCourseNum;

  var tempCourse = courseArray.find(course => course.number === courseNumber);
  if(tempCourse === null || tempCourse === undefined) {
    const course = {
      number: courseNumber,
      name: inputTitle
    };

    await Course.create(course)
    .then(data => {
      tempCourse = data.dataValues;
      courseArray.push(tempCourse);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return tempCourse.id;
}

async function findSemesterId(inputSemesterCode) {

  var tempSemester = semesterArray.find(semester => semester.code === inputSemesterCode);

  if(tempSemester === null || tempSemester === undefined) {
    const semester = {
      code: inputSemesterCode
    };

    await Semester.create(semester)
    .then(data => {
      tempSemester = data.dataValues;
      sectionArray.push(tempSemester);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return tempSemester.id;
}

async function findSectionId(inputSectionNum, inputCourseId, inputSemesterId) {

  var tempSection = sectionArray.find(section => section.number === inputSectionNum && section.courseId === inputCourseId);

  if(tempSection === null || tempSection === undefined) {
    const section = {
      number: inputSectionNum,
      courseId: inputCourseId,
      semesterId: inputSemesterId,
    };

    await Section.create(section)
    .then(data => {
      tempSection = data.dataValues;
      sectionArray.push(tempSection);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return tempSection.id;
}

async function findFacultySectionId(inputFacultyId, inputSectionId) {
  var tempFacultySection = facultySectionArray.find(fs => fs.sectionId === inputSectionId && fs.facultyId === inputFacultyId);
  if(tempFacultySection === null || tempFacultySection === undefined) {
    const facultySection = {
      sectionId: inputSectionId,
      facultyId: inputFacultyId
    };

    await FacultySection.create(facultySection)
    .then(data => {
      tempFacultySection = data.dataValues;
      facultySectionArray.push(tempFacultySection);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return tempFacultySection.id;
}

async function findSectionTimeId(inputStartTime, inputEndTime, inputStartDate, inputEndDate, inputSunday, inputMonday, inputTuesday, inputWednesday, inputThursday, inputFriday, inputSaturday, inputSectionId, inputRoomId) {
  var tempSectionTime;

  if(inputStartDate === '' || inputEndDate === '') {
    return;
  }

  //var tempStart = (inputStartDate != '') ? inputStartDate : "0000-00-00";
  //var tempEnd = (inputEndDate != '') ? inputEndDate : "0000-00-00";


  const sectionTime = {
    startTime: inputStartTime,
    endTime: inputEndTime,
    startDate: inputStartDate,
    endDate: inputEndDate,
    sunday: inputSunday==='Y',
    monday: inputMonday==='Y',
    tuesday: inputTuesday==='Y',
    wednesday: inputWednesday==='Y',
    thursday: inputThursday==='Y',
    friday: inputFriday==='Y',
    saturday: inputSaturday==='Y',
    sectionId: inputSectionId,
    roomId: inputRoomId
  };

  await SectionTime.create(sectionTime)
  .then(data => {
    tempSectionTime = data.dataValues;
  })
  .catch(err => {
    console.log(err);
    console.log("==========================================");
    console.log(sectionTime);
    console.log("==========================================");
    console.log("|"+inputStartDate+"|");
  });
  
  return tempSectionTime;
}