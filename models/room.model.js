module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
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
    capacity: {
      type: Sequelize.INTEGER
    },
  },
  {
    timestamps: false
  });

  return Room;
};