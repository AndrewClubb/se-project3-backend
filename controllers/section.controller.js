const db = require("../models");
const { Op } = require("sequelize");
const Section = db.section;

// Create and Save a new section
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "Number cannot be empty!"
    });
    return;
  }

  const section = {
    number: req.body.number,
    courseId: req.params.courseId,
    semesterId: req.params.semesterId
  };

  // Create and Save a new section
  Section.create(section)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the section."
      });
    });
};

// Retrieve all sections from the database
exports.findAll = (req, res) => {
  Section.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};

// Retrieve a single section with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Section.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find section with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving section with id=' + id
      });
    });
};

// Update a section by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Section.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Section was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update section with id=' + id + '. Maybe section was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating section with id=' + id
    });
  });
};

// Delete a section with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Section.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Section was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete section with id=' + id + '. Maybe section was not found'
      })
    }
  })
};