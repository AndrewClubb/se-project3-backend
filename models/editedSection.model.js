module.exports = (sequelize, Sequelize) => {
  const EditedSection = sequelize.define("editedSection", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },    
    courseNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    crudOperation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    oldStartTime: {
      type: Sequelize.TIME
    },    
    oldEndTime: {
      type: Sequelize.TIME
    },
    oldStartDate: {
      type: Sequelize.DATEONLY
    },
    oldEndDate: {
      type: Sequelize.DATEONLY
    },
    oldSunday: {
      type: Sequelize.BOOLEAN
    },
    oldMonday: {
      type: Sequelize.BOOLEAN
    },
    oldTuesday: {
      type: Sequelize.BOOLEAN
    },
    oldWednesday: {
      type: Sequelize.BOOLEAN
    },
    oldThursday: {
      type: Sequelize.BOOLEAN
    },
    oldFriday: {
      type: Sequelize.BOOLEAN
    },
    oldSaturday: {
      type: Sequelize.BOOLEAN
    },
    oldRoom: {
      type: Sequelize.STRING
    },
    newStartTime: {
      type: Sequelize.TIME
    },    
    newEndTime: {
      type: Sequelize.TIME
    },
    newStartDate: {
      type: Sequelize.DATEONLY
    },
    newEndDate: {
      type: Sequelize.DATEONLY
    },
    newSunday: {
      type: Sequelize.BOOLEAN
    },
    newMonday: {
      type: Sequelize.BOOLEAN
    },
    newTuesday: {
      type: Sequelize.BOOLEAN
    },
    newWednesday: {
      type: Sequelize.BOOLEAN
    },
    newThursday: {
      type: Sequelize.BOOLEAN
    },
    newFriday: {
      type: Sequelize.BOOLEAN
    },
    newSaturday: {
      type: Sequelize.BOOLEAN
    },
    newRoom: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  });
  return EditedSection;
};