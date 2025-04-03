const { Model, DataTypes } = require('sequelize');

class Review extends Model {
  static associate(models) {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Review.belongsTo(models.Event, {
      foreignKey: 'eventId',
      as: 'event',
    });
  }
}

module.exports = (sequelize) => {
  Review.init({
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Review',
    timestamps: true,
  });

  return Review;
};