const db = require("../models");
const { Op } = require("sequelize");
const Section = db.section;
const SectionTime = db.sectionTime;
const EditedSection = db.editedSection;
const Room = db.room;
const Course = db.course;

// Create and Save a new sectionTime
exports.create = (req, res) => {
  // Validate request
  if (!req.body.startTime) {
    res.status(400).send({
      message: "Start time cannot be empty!"
    });
    return;
  } else if (!req.body.endTime) {
    res.status(400).send({
      message: "End time cannot be empty!"
    });
    return;
  } else if (!req.body.startDate) {
    res.status(400).send({
      message: "Start date cannot be empty!"
    });
    return;
  } else if (!req.body.endDate) {
    res.status(400).send({
      message: "End date cannot be empty!"
    });
    return;
  }
  
  const sectionTime = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    sunday: req.body.sunday,
    monday: req.body.monday,
    tuesday: req.body.tuesday,
    wednesday: req.body.wednesday,
    thursday: req.body.thursday,
    friday: req.body.friday,
    saturday: req.body.saturday,
    sectionId: req.body.sectionId,
    roomId: req.body.roomId
  };

  // Create and Save a new sectionTime
  SectionTime.create(sectionTime)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sectionTime."
      });
    });
  
  editedSectionCreate(sectionTime);
};

async function editedSectionCreate(sectionTime) {
  var section, roomNumber, courseNumber;

  await Section.findByPk(sectionTime.sectionId)
    .then(data => {
      section = data.dataValues;
    })
    .catch(err => {
      console.log(err);
    });

  await Room.findByPk(sectionTime.roomId)
    .then(data => {
      roomNumber = data.dataValues.number;
    })
    .catch(err => {
      console.log(err);
    });

  await Course.findByPk(section.courseId)
    .then(data => {
      courseNumber = data.dataValues.number;
    })
    .catch(err => {
      console.log(err);
    });

  const editedSection = {
    courseNumber: courseNumber,
    crudOperation: "Added",
    newNumber: section.number,
    newStartTime: sectionTime.startTime,
    newEndTime: sectionTime.endTime,
    newStartDate: sectionTime.startDate,
    newEndDate: sectionTime.endDate,
    newSunday: sectionTime.sunday,
    newMonday: sectionTime.monday,
    newTuesday: sectionTime.tuesday,
    newWednesday: sectionTime.wednesday,
    newThursday: sectionTime.thursday,
    newFriday: sectionTime.friday,
    newSaturday: sectionTime.saturday,
    newRoom: roomNumber
  };

  EditedSection.create(editedSection)
    .catch(err => {
      console.log(err);
    });
};

// Retrieve all sectionTimes from the database
exports.findAll = (req, res) => {
  SectionTime.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sectionTimes."
      });
    });
};

// Retrieve a single sectionTime with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  SectionTime.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find sectionTime with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving sectionTime with id=' + id
      });
    });
};

// Update a sectionTime by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  var sectionTime;
  if(req.body.startTime != null && req.body.startTime != undefined) {
    sectionTime.startTime = req.body.startTime;
  }

  await editedSectionUpdate(id, req.body);

  SectionTime.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'SectionTime was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update sectionTime with id=' + id + '. Maybe sectionTime was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating sectionTime with id=' + id
    });
  });
};

async function editedSectionUpdate(sectionTimeId, body) {
  var sectionTime, section, roomNumber, courseNumber;

  await SectionTime.findByPk(sectionTimeId)
    .then(data => {
      sectionTime = data.dataValues;
    })
    .catch(err => {
      console.log(err);
    });

  await Section.findByPk(sectionTime.sectionId)
    .then(data => {
      section = data.dataValues;
    })
    .catch(err => {
      console.log(err);
    });

  await Room.findByPk(sectionTime.roomId)
    .then(data => {
      roomNumber = data.dataValues.number;
    })
    .catch(err => {
      console.log(err);
    });
  
  await Course.findByPk(section.courseId)
    .then(data => {
      courseNumber = data.dataValues.number;
    })
    .catch(err => {
      console.log(err);
    });

  const editedSection = {
    courseNumber: courseNumber,
    crudOperation: "Updated"
  };

  if(body.startTime != null && sectionTime.startTime != body.startTime) {
    editedSection.oldStartTime = sectionTime.startTime;
    editedSection.newStartTime = body.startTime;
  }
  if(body.endTime != null && sectionTime.endTime != body.endTime){
    editedSection.oldEndTime = sectionTime.endTime;
    editedSection.newEndTime = body.endTime;
  }
  if(body.startDate != null && sectionTime.startDate != body.startDate) {
    editedSection.oldStartDate = sectionTime.startDate;
    editedSection.newStartDate = body.startDate;
  }
  if(body.endDate != null && sectionTime.endDate != body.endDate) {
    editedSection.oldEndDate = sectionTime.endDate;
    editedSection.newEndDate = body.endDate;
  }
  if(body.sunday != null && sectionTime.sunday != body.sunday) {
    editedSection.oldSunday = sectionTime.sunday;
    editedSection.newSunday = body.sunday;
  }
  if(body.monday != null && sectionTime.monday != body.monday) {
    editedSection.oldMonday = sectionTime.monday;
    editedSection.newMonday = body.monday;
  }
  if(body.tuesday != null && sectionTime.tuesday != body.tuesday) {
    editedSection.oldTuesday = sectionTime.tuesday;
    editedSection.newTuesday = body.tuesday;
  }
  if(body.wednesday != null && sectionTime.wednesday != body.wednesday) {
    editedSection.oldWednesday = sectionTime.wednesday;
    editedSection.newWednesday = body.wednesday;
  }
  if(body.thursday != null && sectionTime.thursday != body.thursday) {
    editedSection.oldThursday = sectionTime.thursday;
    editedSection.newThursday = body.thursday;
  }
  if(body.friday != null && sectionTime.friday != body.friday) {
    editedSection.oldFriday = sectionTime.friday;
    editedSection.newFriday = body.friday;
  }
  if(body.saturday != null && sectionTime.saturday != body.saturday) {
    editedSection.oldSaturday = sectionTime.saturday;
    editedSection.newSaturday = body.saturday;
  }
  if(body.roomNumber != null && roomNumber != body.roomNumber) {
    editedSection.oldRoomNumber = roomNumber;
    editedSection.newRoomNumber = body.roomNumber;
  }

  EditedSection.create(editedSection)
    .catch(err => {
      console.log(err);
    });
};

// Delete a sectionTime with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;


  SectionTime.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'SectionTime was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete sectionTime with id=' + id + '. Maybe sectionTime was not found'
      })
    }
  })
};

async function editedSectionDelete(sectionTimeId) {
  var section;

  await Section.findByPk(sectionTime.sectionId)
    .then(data => {
      section = data.dataValues;
    })
    .catch(err => {
      console.log(err);
    });

  const editedSection = {
    sectionId: sectionTime.sectionId,
    crudOperation: "Added",
    newNumber: section.number,
    newStartTime: sectionTime.startTime,
    newEndTime: sectionTime.endTime,
    newStartDate: sectionTime.startDate,
    newEndDate: sectionTime.endDate,
    newSunday: sectionTime.sunday,
    newMonday: sectionTime.monday,
    newTuesday: sectionTime.tuesday,
    newWednesday: sectionTime.wednesday,
    newThursday: sectionTime.thursday,
    newFriday: sectionTime.friday,
    newSaturday: sectionTime.saturday,
    newSemesterId: section.semesterId,
    newRoomId: sectionTime.roomId
  };

  EditedSection.create(editedSection)
    .then(data => {
      //console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};