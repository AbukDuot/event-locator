module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      latitude: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      longitude: {
          type: DataTypes.FLOAT,
          allowNull: false,
      },
      event_date: {
          type: DataTypes.DATE,
          allowNull: false,
      },
      categories: {
          type: DataTypes.JSONB,
          allowNull: true,
      },
  });

  return Event;  // The model object must be returned
};
