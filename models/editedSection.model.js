module.exports = (sequelize, Sequelize) => {
  const EditedSection = sequelize.define("editedSection", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },    
    number: {
      type: Sequelize.STRING
    },
    startTime: {
      type: Sequelize.TIME
    },    
    endTime: {
      type: Sequelize.TIME
    },
    startDate: {
      type: Sequelize.DATEONLY
    },
    endDate: {
      type: Sequelize.DATEONLY
    },
    sunday: {
      type: Sequelize.BOOLEAN
    },
    monday: {
      type: Sequelize.BOOLEAN
    },
    tuesday: {
      type: Sequelize.BOOLEAN
    },
    wednesday: {
      type: Sequelize.BOOLEAN
    },
    thursday: {
      type: Sequelize.BOOLEAN
    },
    friday: {
      type: Sequelize.BOOLEAN
    },
    saturday: {
      type: Sequelize.BOOLEAN
    },
    semesterId: {
      type: Sequelize.STRING
    },
    roomId: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  });
  return EditedSection;
};