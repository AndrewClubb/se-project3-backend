module.exports = app => {
    const room = require("../controllers/room.controller.js");
    var router = require("express").Router();

    // Create a new room
    router.post("/", room.create);
    // Retrieve all rooms
    router.get("/", room.findAll);
    // Retrieve a single room with id
    router.get("/:id", room.findById);
    // Update a room with id
    router.put("/:id", room.update);
    // Delete a room with id
    router.delete("/:id", room.delete);

    app.use('/schedule-t2/room', router);
};