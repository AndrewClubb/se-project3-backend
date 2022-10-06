module.exports = (sequelize, Sequelize) => {
  const Faculty = sequelize.define("faculty", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },    
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },    
    fName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  });

  return Faculty;
};