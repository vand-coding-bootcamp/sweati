module.exports = function(sequelize, DataTypes) {
  var Friends = sequelize.define(
    "Friends",
    {
      friends: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  Friends.associate = function(models) {
    Friends.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Friends;
};
