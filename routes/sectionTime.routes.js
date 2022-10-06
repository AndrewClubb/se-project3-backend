module.exports = app => {
    const sectionTime = require("../controllers/sectionTime.controller.js");
    var router = require("express").Router();

    // Create a new sectionTime
    router.post("/", sectionTime.create);
    // Retrieve all sectionTimes
    router.get("/", sectionTime.findAll);
    // Retrieve a single sectionTime with id
    router.get("/:id", sectionTime.findById);
    // Update a sectionTime with id
    router.put("/:id", sectionTime.update);
    // Delete a sectionTime with id
    router.delete("/:id", sectionTime.delete);

    app.use('/schedule-t2/sectionTime', router);
};