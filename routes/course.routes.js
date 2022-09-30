module.exports = app => {
    const course = require("../controllers/course.controller.js");
    var router = require("express").Router();

    // Create a new course
    router.post("/", course.create);
    // Retrieve all courses
    router.get("/", course.findAllCourses);
    // Retrieve a single course with id
    router.get("/id/:id", course.findCourseById);
    // Retrieve courses by dept
    router.get("/dept/:dept", course.findCoursesByDept);
    // Retrieve courses by name
    router.get("/name/:name", course.findCoursesByName);
    // Retrieve courses by course number
    router.get("/num/:num", course.findCoursesByNumber);
    // Update a course with id
    router.put("/:id", course.update);
    // Delete a course with id
    router.delete("/:id", course.delete);

    app.use('/schedule-t2', router);
};