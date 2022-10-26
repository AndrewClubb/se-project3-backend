module.exports = app => {
    const csvController = require("../controllers/csv.controller");
    var router = require("express").Router();
    const upload = require("../middlewares/upload");

    //upload a section csv file
    router.post("/sections", upload.single("file"), csvController.uploadSections);   
    //upload a course csv file 
    router.post("/courses", upload.single("file"), csvController.uploadCourses);  

    app.use('/schedule-t2/upload', router);
};