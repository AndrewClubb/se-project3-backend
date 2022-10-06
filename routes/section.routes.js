module.exports = app => {
    const section = require("../controllers/section.controller.js");
    var router = require("express").Router();

    // Create a new section
    router.post("/", section.create);
    // Retrieve all sections
    router.get("/", section.findAll);
    // Retrieve a single section with id
    router.get("/:id", section.findById);
    // Update a section with id
    router.put("/:id", section.update);
    // Delete a section with id
    router.delete("/:id", section.delete);

    app.use('/schedule-t2/section', router);
};