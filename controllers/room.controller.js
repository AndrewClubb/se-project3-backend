const db = require("../models");
const { Op } = require("sequelize");
const Room = db.room;

// Create and Save a new room
exports.create = (req, res) => {
  // Validate request
  if (!req.body.number) {
    res.status(400).send({
      message: "Number can not be empty!",
    });
    return;
  }

  const room = {
    number: req.body.number,
    capacity: req.body.capacity,
  };

  // Create and Save a new room
  Room.create(room)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the room.",
      });
    });
};

// Retrieve all rooms from the database
exports.findAll = (req, res) => {
  Room.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rooms.",
      });
    });
};

// Retrieve a single room with an id
exports.findById = (req, res) => {
  const id = req.params.id;
  Room.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find room with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving room with id=" + id,
      });
    });
};

// Update a room by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Room.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Room was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update room with id=" +
            id +
            ". Maybe room was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating room with id=" + id,
      });
    });
};

// Delete a room with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Room.destroy({
    where: { id: id },
  }).then((num) => {
    if (num == 1) {
      res.send({
        message: "Room was deleted successfully!",
      });
    } else {
      res.send({
        message:
          "Cannot delete room with id=" + id + ". Maybe room was not found",
      });
    }
  });
};
