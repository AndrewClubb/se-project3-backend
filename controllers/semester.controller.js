const db = require("../models");
const { Op } = require("sequelize");
const Semester = db.semester;

// Create and Save a new semester
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({
      message: "Semester code cannot be empty!"
    });
    return;
  }
  
  const semester = {
    code: req.body.code,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };

  // Create and Save a new semester
  Semester.create(semester)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the semester."
      });
    });
};

// Retrieve all semesters from the database
exports.findAll = (req, res) => {
  Semester.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving semesters."
      });
    });
};

// Retrieve a single semester with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Semester.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find semester with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving semester with id=' + id
      });
    });
};

// Update a semester by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Semester.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Semester was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update semester with id=' + id + '. Maybe semester was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating semester with id=' + id
    });
  });
};

// Delete a semester with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Semester was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete semester with id=' + id + '. Maybe semester was not found'
      })
    }
  })
};