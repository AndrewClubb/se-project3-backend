module.exports = app => {
    const csvController = require("../controllers/csv.controller");
    var router = require("express").Router();
    const upload = require("../middlewares/upload");

    //upload a csv file
    router.post("/upload", upload.single("file"), csvController.upload);

    app.use('/schedule-t2/csv', router);
};