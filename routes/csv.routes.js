module.exports = app => {
    const csvController = require("../controllers/csv.controller");
    var router = require("express").Router();
    const upload = require("../middlewares/upload");

    //upload a csv file
    router.post("/upload/section", upload.single("file"), csvController.upload);
    //router.post("/upload", upload, csvController.upload);

    app.use('/schedule-t2/file', router);
};