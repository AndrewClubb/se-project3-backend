module.exports = app => {
    const editedSection = require("../controllers/editedSection.controller.js");
    var router = require("express").Router();

    // Create a new editedSection
    router.post("/", editedSection.create);
    // Retrieve all editedSections
    router.get("/", editedSection.findAll);
    // Retrieve a single editedSection with id
    router.get("/:id", editedSection.findById);
    // Update a editedSection with id
    router.put("/:id", editedSection.update);
    // Delete a editedSection with id
    router.delete("/:id", editedSection.delete);

    app.use('/schedule-t2/editedSection', router);
};