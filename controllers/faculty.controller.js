const db = require("../models");
const { Op } = require("sequelize");
const Faculty = db.faculty;

// Create and Save a new faculty
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title cannot be empty!"
    });
    return;
  } else if (!req.body.fName) {
    res.status(400).send({
      message: "First name cannot be empty!"
    });
    return;
  } else if (!req.body.lName) {
    res.status(400).send({
      message: "Last name cannot be empty!"
    });
    return;
  }
  
  const faculty = {
    title: req.body.title,
    fName: req.body.fName,
    lName: req.body.lName
  };

  // Create and Save a new faculty
  Faculty.create(faculty)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the faculty."
      });
    });
};

// Retrieve all faculty from the database
exports.findAll = (req, res) => {
  Faculty.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving faculty."
      });
    });
};

// Retrieve a single faculty with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Faculty.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find faculty with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving faculty with id=' + id
      });
    });
};

// Update a faculty by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Faculty.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Faculty was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update faculty with id=' + id + '. Maybe faculty was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating faculty with id=' + id
    });
  });
};

// Delete a faculty with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Faculty.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Faculty was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete faculty with id=' + id + '. Maybe faculty was not found'
      })
    }
  })
};