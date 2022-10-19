const db = require("../models");
const { Op } = require("sequelize");
const FacultySection = db.facultySection;

// Create and Save a new facultySection
exports.create = (req, res) => {
  const facultySection = {
    sectionId: req.params.sectionId,
    facultyId: req.params.facultyId
  };

  // Create and Save a new facultySection
  FacultySection.create(facultySection)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the facultySection."
      });
    });
};

// Retrieve all facultySections from the database
exports.findAll = (req, res) => {
  FacultySection.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving facultySections."
      });
    });
};

// Retrieve a single facultySection with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  FacultySection.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find facultySection with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving facultySection with id=' + id
      });
    });
};

// Update a facultySection by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  FacultySection.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'FacultySection was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update facultySection with id=' + id + '. Maybe facultySection was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating facultySection with id=' + id
    });
  });
};

// Delete a facultySection with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  FacultySection.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'FacultySection was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete facultySection with id=' + id + '. Maybe facultySection was not found'
      })
    }
  })
};