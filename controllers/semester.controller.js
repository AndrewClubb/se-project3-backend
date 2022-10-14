const db = require("../models");
const { Op } = require("sequelize");
const Semester = db.semester;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({
      message: "Semester code cannot be empty!"
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
  
  const semester = {
    code: req.body.code,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };

  // Create and Save a new Course
  Semester.create(semester)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    });
};

// Retrieve all Courses from the database
exports.findAll = (req, res) => {
  Semester.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Courses."
      });
    });
};

// Retrieve a single Course with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Semester.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find Course with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Course with id=' + id
      });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Semester.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update Course with id=' + id + '. Maybe Course was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating Course with id=' + id
    });
  });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete Course with id=${id}. Maybe Course was not found or '
      })
    }
  })
};