const db = require("../models");
const { Op } = require("sequelize");
const FacultySection = db.facultySection;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const facultySection = {
    sectionId: req.params.sectionId,
    facultyId: req.params.facultyId
  };

  // Create and Save a new Course
  FacultySection.create(facultySection)
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
  FacultySection.findAll()
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
  FacultySection.findByPk(id)
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
  FacultySection.update(req.body, {
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
  FacultySection.destroy({
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