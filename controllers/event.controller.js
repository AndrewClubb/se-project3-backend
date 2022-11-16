const db = require("../models");
const { Op } = require("sequelize");
const Event = db.event;

// Create and Save a new event
exports.create = (req, res) => {
  const event = {
    facultyId: req.body.facultyId,
    semesterId: req.body.semesterId,
    roomId: req.body.roomId
  };

  // Create and Save a new event
  Event.create(event)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the event."
      });
    });
};

// Retrieve all events from the database
exports.findAll = (req, res) => {
  Event.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving events."
      });
    });
};

// Retrieve a single event with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Event.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find event with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving event with id=' + id
      });
    });
};

// Update a event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Event.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Event was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update event with id=' + id + '. Maybe event was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating event with id=' + id
    });
  });
};

// Delete a event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Event.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Event was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete event with id='+id+'. Maybe event was not found'
      })
    }
  })
};