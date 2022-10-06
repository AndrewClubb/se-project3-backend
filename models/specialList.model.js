module.exports = (sequelize, Sequelize) => {
  const SpecialList = sequelize.define("specialList", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
  },
  {
    timestamps: false
  });

  return SpecialList;
};