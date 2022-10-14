const db = require("../models");
const { Op } = require("sequelize");
const SpecialList = db.specialList;

// Create and Save a new specialList
exports.create = (req, res) => {
  const course = {
    userId: req.params.userId,
    courseId: req.params.courseId
  };

  // Create and Save a new Course
  SpecialList.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the specialList."
      });
    });
};

// Retrieve all specialLists from the database
exports.findAll = (req, res) => {
  SpecialList.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving specialLists."
      });
    });
};

// Retrieve a single specialList with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  SpecialList.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find specialList with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving specialList with id=' + id
      });
    });
};

// Update a specialList by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  SpecialList.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'SpecialList was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update specialList with id=' + id + '. Maybe specialList was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating specialList with id=' + id
    });
  });
};

// Delete a specialList with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  SpecialList.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'SpecialList was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete specialList with id=' + id + '. Maybe specialList was not found'
      })
    }
  })
};