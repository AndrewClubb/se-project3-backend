const db = require("../models");
const { Op } = require("sequelize");
const User = db.user;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Email cannot be empty!"
    });
    return;
  } else if (!req.body.role) {
    res.status(400).send({
      message: "Role can not be empty!"
    });
    return;
  }
  
  const user = {
    email: req.body.email,
    role: req.body.role
  };

  // Create and Save a new user
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all users from the database
exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Retrieve a single user with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find user with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'User was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update user with id=' + id + '. Maybe user was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating user with id=' + id
    });
  });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'User was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete user with id=' + id + '. Maybe user was not found'
      })
    }
  })
};