const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    supportBigNumbers: true,
  },
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.course = require("./course.model.js")(sequelize, Sequelize);
db.editedSection = require("./editedSection.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.facultySection = require("./facultySection.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.section = require("./section.model.js")(sequelize, Sequelize);
db.sectionTime = require("./sectionTime.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.specialList = require("./specialList.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

//foreign keys for specialList
db.user.hasMany(
  db.specialList,
  { as: "specialList" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.course.hasMany(
  db.specialList,
  { as: "specialList" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.specialList.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.specialList.belongsTo(
  db.course,
  { as: "course" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign keys for section
db.course.hasMany(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.semester.hasMany(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.section.belongsTo(
  db.course,
  { as: "course" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.section.belongsTo(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign keys for sectionTime
db.section.hasMany(
  db.sectionTime,
  { as: "sectionTime" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.room.hasMany(
  db.sectionTime,
  { as: "sectionTime" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.sectionTime.belongsTo(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.sectionTime.belongsTo(
  db.room,
  { as: "room" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign keys for facultySection
db.section.hasMany(
  db.facultySection,
  { as: "facultySection" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.faculty.hasMany(
  db.facultySection,
  { as: "facultySection" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.facultySection.belongsTo(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.facultySection.belongsTo(
  db.faculty,
  { as: "faculty" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign keys for events
db.faculty.hasMany(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.semester.hasMany(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.room.hasMany(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.belongsTo(
  db.faculty,
  { as: "faculty" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.belongsTo(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.belongsTo(
  db.room,
  { as: "room" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign keys for editedSection
db.section.hasMany(
  db.editedSection,
  { as: "editedSection" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.editedSection.belongsTo(
  db.section,
  { as: "section" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
