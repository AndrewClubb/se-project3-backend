module.exports = app => {
    const specialList = require("../controllers/specialList.controller.js");
    var router = require("express").Router();

    // Create a new specialList
    router.post("/", specialList.create);
    // Retrieve all specialLists
    router.get("/", specialList.findAll);
    // Retrieve a single specialList with id
    router.get("/:id", specialList.findById);
    // Update a specialList with id
    router.put("/:id", specialList.update);
    // Delete a specialList with id
    router.delete("/:id", specialList.delete);

    app.use('/schedule-t2/specialList', router);
};