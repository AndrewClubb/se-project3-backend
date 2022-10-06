module.exports = (sequelize, Sequelize) => {
  const SectionTime = sequelize.define("sectionTime", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },    
    startTime: {
      type: Sequelize.TIME,
      allowNull: false
    },    
    endTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
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
  },
  {
    timestamps: false
  });

  return SectionTime;
};