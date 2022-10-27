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

let facultyArray = [], sectionArray = [], roomArray = [], courseArray = [], semesterArray = [], 
    facultySectionArray = [], sectionTimeArray = [];

exports.uploadSections = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Please upload a CSV file!");
  }

  try {
    let fileContent = await fs.readFile("resources/static/assets/uploads/" + req.file.filename);
    const records = csv.parse(fileContent, {columns: true});

    //Validating required headers are in the csv file
    let headerErrorMessage = validateSectionHeaders(records[0]);
    if(headerErrorMessage != "") {
      fs.unlink("resources/static/assets/uploads/" + req.file.filename);
      return res.status(400).send(req.file.originalname + " is missing collumns ["+headerErrorMessage+"]");
    }

    await loadSectionArrays();

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

exports.uploadCourses = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send({message:"Please upload a CSV file!"});
  }

  try {
    let fileContent = await fs.readFile("resources/static/assets/uploads/" + req.file.filename);
    const records = csv.parse(fileContent, {columns: true});

    //Validating required headers are in the csv file
    let headerErrorMessage = validateCourseHeaders(records[0]);
    if(headerErrorMessage != "") {
      fs.unlink("resources/static/assets/uploads/" + req.file.filename);
      return res.status(400).send({message: req.file.originalname + " is missing collumns ["+headerErrorMessage+"]"});
    }

    await loadCourseArrays();
    //console.log("|"+records+"|");

    for(let rowIndex = 0; rowIndex < records.length; rowIndex++) {
      //General variables
      let row = records[rowIndex];

      await uploadCourse(row["Course"], row["Short Title"], row["Description"]);
    }

    fs.unlink("resources/static/assets/uploads/" + req.file.filename);
    
    res.status(200).send({
      message:
        "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
    fs.unlink("resources/static/assets/uploads/" + req.file.filename);
    res.status(500).send({
      message: "There was a problem uploading the file: " + req.file.originalname,
      error: error
    });
  }
};

async function loadSectionArrays() {
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

  await SectionTime.findAll()
    .then(data => {
      for(let index = 0; index < data.length; index++) {
        sectionTimeArray.push(data[index].dataValues);
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

  if(inputStartDate === '' || inputEndDate === '') {
    return;
  }

  var tempSectionTime = sectionTimeArray.find(st => (st.startTime === inputStartTime || (st.startTime === "00:00:00" && inputStartTime === "")) && (st.endTime === inputEndTime || (st.endTime === "00:00:00" && inputEndTime === "")) && st.startDate === inputStartDate && st.endDate === inputEndDate && st.sectionId === inputSectionId && st.roomId === inputRoomId);

  if(tempSectionTime === null || tempSectionTime === undefined) {
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
      sectionTimeArray.push(tempSectionTime);
    })
    .catch(err => {
      console.log(err);
    });
  }
  return tempSectionTime;
}

function validateSectionHeaders(records) {
  let headerErrorArray = [];  
  let headerErrorMessage = "";

  if(records["Bldg"] === undefined) {headerErrorArray.push("Bldg");}
  if(records["Room"] === undefined) {headerErrorArray.push("Room");}
  if(records["Start Time 24hr"] === undefined) {headerErrorArray.push("Start Time 24hr");}
  if(records["End Time 24hr"] === undefined) {headerErrorArray.push("End Time 24hr");}
  if(records["Meeting Start Date"] === undefined) {headerErrorArray.push("Meeting Start Date");}
  if(records["Meeting End Date"] === undefined) {headerErrorArray.push("Meeting End Date");}
  if(records["Sun"] === undefined) {headerErrorArray.push("Sun");}
  if(records["Mon"] === undefined) {headerErrorArray.push("Mon");}
  if(records["Tue"] === undefined) {headerErrorArray.push("Tue");}
  if(records["Wed"] === undefined) {headerErrorArray.push("Wed");}
  if(records["Thu"] === undefined) {headerErrorArray.push("Thu");}
  if(records["Fri"] === undefined) {headerErrorArray.push("Fri");}
  if(records["Sat"] === undefined) {headerErrorArray.push("Sat");}
  if(records["Faculty Name (LFM)"] === undefined) {headerErrorArray.push("Faculty Name (LFM)");}
  if(records["Faculty Name 2 (LFM)"] === undefined) {headerErrorArray.push("Faculty Name 2 (LFM)");}
  if(records["Subject"] === undefined) {headerErrorArray.push("Subject");}
  if(records["Course #"] === undefined) {headerErrorArray.push("Course #");}
  if(records["Section Title"] === undefined) {headerErrorArray.push("Section Title");}
  if(records["Term"] === undefined) {headerErrorArray.push("Term");}
  if(records["Section #"] === undefined) {headerErrorArray.push("Section #");}

  if(headerErrorArray.length != 0) {
    headerErrorMessage = headerErrorArray[0];

    for(let index = 1; index < headerErrorArray.length; index++) {
      headerErrorMessage += ", " + headerErrorArray[index];
    }
  }

  return headerErrorMessage;
}

async function loadCourseArrays() {
  await Course.findAll()
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        courseArray.push(data[index].dataValues);    
      }
    })
    .catch(err => {
      console.log(err)
    });
};

function validateCourseHeaders(records) {
  let headerErrorArray = [];  
  let headerErrorMessage = "";

  if(records["Course"] === undefined) {headerErrorArray.push("Course");}
  if(records["Short Title"] === undefined) {headerErrorArray.push("Short Title");}
  if(records["Description"] === undefined) {headerErrorArray.push("Description");}

  if(headerErrorArray.length != 0) {
    headerErrorMessage = headerErrorArray[0];

    for(let index = 1; index < headerErrorArray.length; index++) {
      headerErrorMessage += ", " + headerErrorArray[index];
    }
  }

  return headerErrorMessage;
}

async function uploadCourse(inputNumber, inputTitle, inputDescription) {
  var tempCourse = courseArray.find(course => course.number === inputNumber);

  if(tempCourse === null || tempCourse === undefined) {
    const course = {
      number: inputNumber,
      name: inputTitle,
      description: inputDescription
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
  else if(tempCourse.description === null) {
    const id = tempCourse.id;
    const course = {
      description: inputDescription
    };

    await Course.update(course, {
      where: { id: id }
    })
    .then(num => {
      console.log("Updated course");
    })
    .catch(err => {
      console.log(err);
    });
  }
}