const db = require("../models");
const { Op } = require("sequelize");
const EditedSection = db.editedSection;

// Create and Save a new editedSection
exports.create = (req, res) => {
  const editedSection = {
    sectionNumber: req.body.sectionNumber,
    crudOperation: req.body.crudOperation,
    oldStartTime: req.body.oldStartTime,
    oldEndTime: req.body.oldEndTime,
    oldStartDate: req.body.oldStartDate,
    oldEndDate: req.body.oldEndDate,
    oldSunday: req.body.oldSunday,
    oldMonday: req.body.oldMonday,
    oldTuesday: req.body.oldTuesday,
    oldWednesday: req.body.oldWednesday,
    oldThursday: req.body.oldThursday,
    oldFriday: req.body.oldFriday,
    oldSaturday: req.body.oldSaturday,
    oldRoom: req.body.oldRoom,
    newStartTime: req.body.newStartTime,
    newEndTime: req.body.newEndTime,
    newStartDate: req.body.newStartDate,
    newEndDate: req.body.newEndDate,
    newSunday: req.body.newSunday,
    newMonday: req.body.newMonday,
    newTuesday: req.body.newTuesday,
    newWednesday: req.body.newWednesday,
    newThursday: req.body.newThursday,
    newFriday: req.body.newFriday,
    newSaturday: req.body.newSaturday,
    newRoom: req.body.newRoom
  };

  // Create and Save a new editedSection
  EditedSection.create(editedSection)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the editedSection."
      });
    });
};

// Retrieve all editedSections from the database
exports.findAll = (req, res) => {
  EditedSection.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the editedSections."
      });
    });
};

// Retrieve a single editedSection with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  EditedSection.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find the editedSection with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving the editedSection with id=' + id
      });
    });
};

// Update a editedSection by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EditedSection.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update the editedSection with id=' + id + '. Maybe the editedSection was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating the editedSection with id=' + id
    });
  });
};

// Delete a editedSection with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  EditedSection.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'The editedSection was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete the editedSection with id='+id+'. Maybe the editedSection was not found'
      })
    }
  })
};