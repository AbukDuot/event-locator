const { Model, DataTypes } = require('sequelize');

class Favorite extends Model {
  static associate(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Favorite.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'event',
    });
  }
}

module.exports = (sequelize) => {
  Favorite.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Favorite',
    timestamps: true,
  });

  return Favorite;
};