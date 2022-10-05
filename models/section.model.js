module.exports = (sequelize, Sequelize) => {
  const Section = sequelize.define("section", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },    
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    timestamps: false
  });

  return Section;
};