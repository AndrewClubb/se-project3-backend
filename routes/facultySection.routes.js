module.exports = app => {
    const facultySection = require("../controllers/facultySection.controller.js");
    var router = require("express").Router();

    // Create a new facultySection
    router.post("/", facultySection.create);
    // Retrieve all facultySections
    router.get("/", facultySection.findAll);
    // Retrieve a single facultySection with id
    router.get("/:id", facultySection.findById);
    // Update a facultySection with id
    router.put("/:id", facultySection.update);
    // Delete a facultySection with id
    router.delete("/:id", facultySection.delete);

    app.use('/schedule-t2/facultySection', router);
};