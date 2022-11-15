const db = require("../models");
const { Op } = require("sequelize");
const Section = db.section;
const SectionTime = db.sectionTime;
const EditedSection = db.editedSection;

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

async function editedSectionDelete(sectionTime) {
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