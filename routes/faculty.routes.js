module.exports = app => {
    const faculty = require("../controllers/faculty.controller.js");
    var router = require("express").Router();

    // Create a new faculty
    router.post("/", faculty.create);
    // Retrieve all faculty
    router.get("/", faculty.findAll);
    // Retrieve a single faculty with id
    router.get("/:id", faculty.findById);
    // Update a faculty with id
    router.put("/:id", faculty.update);
    // Delete a faculty with id
    router.delete("/:id", faculty.delete);

    app.use('/schedule-t2/faculty', router);
};