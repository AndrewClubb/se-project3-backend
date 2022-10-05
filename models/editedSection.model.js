module.exports = (sequelize, Sequelize) => {
  const EditedSection = sequelize.define("editedSection", {
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
  return EditedSection;
};