module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },    
    number: {
      type: Sequelize.STRING,
      allowNull: false
    },    
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(3000)
    },
    hours: {
      type: Sequelize.INTEGER
    },
    level: {
      type: Sequelize.INTEGER
    },
  },
  {
    timestamps: false
  });

  return Course;
};