const db = require("../models");
const { Op } = require("sequelize");
const SectionTime = db.sectionTime;

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
    sectionId: req.params.sectionId,
    roomId: req.params.roomId
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
exports.update = (req, res) => {
  const id = req.params.id;
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