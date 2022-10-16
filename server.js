const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models");

db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./routes/course.routes.js")(app);
require("./routes/editedSection.routes.js")(app);
require("./routes/event.routes.js")(app);
require("./routes/faculty.routes.js")(app);
require("./routes/facultySection.routes.js")(app);
require("./routes/room.routes.js")(app);
require("./routes/section.routes.js")(app);
require("./routes/sectionTime.routes.js")(app);
require("./routes/semester.routes.js")(app);
require("./routes/specialList.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/csv.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});