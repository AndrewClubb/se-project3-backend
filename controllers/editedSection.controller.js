const db = require("../models");
const { Op } = require("sequelize");
const EditedSection = db.editedSection;

// Create and Save a new editedSection
exports.create = (req, res) => {
  const editedSection = {
    sectionId: req.params.sectionId,
    crudOperation: req.params.crudOperation,
    oldNumber: req.params.oldNumber,
    oldStartTime: req.params.oldStartTime,
    oldEndTime: req.params.oldEndTime,
    oldStartDate: req.params.oldStartDate,
    oldEndDate: req.params.oldEndDate,
    oldSunday: req.params.oldSunday,
    oldMonday: req.params.oldMonday,
    oldTuesday: req.params.oldTuesday,
    oldWednesday: req.params.oldWednesday,
    oldThursday: req.params.oldThursday,
    oldFriday: req.params.oldFriday,
    oldSaturday: req.params.oldSaturday,
    oldSemesterId: req.params.oldSemesterId,
    oldRoomId: req.params.oldRoomId,
    newNumber: req.params.newNumber,
    newStartTime: req.params.newStartTime,
    newEndTime: req.params.newEndTime,
    newStartDate: req.params.newStartDate,
    newEndDate: req.params.newEndDate,
    newSunday: req.params.newSunday,
    newMonday: req.params.newMonday,
    newTuesday: req.params.newTuesday,
    newWednesday: req.params.newWednesday,
    newThursday: req.params.newThursday,
    newFriday: req.params.newFriday,
    newSaturday: req.params.newSaturday,
    newSemesterId: req.params.newSemesterId,
    newRoomId: req.params.newRoomId
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