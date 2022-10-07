const db = require("../models");
const { Op } = require("sequelize");
const Course = db.course;

// Create and Save a new course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "number cannot be empty!"
    });
    return;
  } else if (!req.body.name) {
    res.status(400).send({
      message: "name cannot be empty!"
    });
    return;
  }
  
  const course = {
    number: req.body.number,
    name: req.body.name,
    description: req.body.description,
    hours: req.body.hours,
    level: req.body.level 
  };

  // Create and Save a new Course
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the course."
      });
    });
};

// Retrieve all Courses from the database
exports.findAll = (req, res) => {
  Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the courses."
      });
    });
};

// Retrieve a single Course with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find the course with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving the course with id=' + id
      });
    });
};

// Update a Course by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Course.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update the course with id=' + id + '. Maybe the course was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating the course with id=' + id
    });
  });
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Course was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete the course with id='+id+'. Maybe Course was not found'
      })
    }
  })
};