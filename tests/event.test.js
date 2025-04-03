module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false, // This field is required
      validate: {
        notEmpty: true, // Ensure the title is not an empty string
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false, // This field is required
      validate: {
        isDate: true, // Ensure the date is a valid date
        notNull: { msg: 'Date is required' },
      },
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false, // This field is required
      validate: {
        notEmpty: true, // Ensure categories is not an empty array
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false, // This field is required
      validate: {
        isUUID: 4, // Ensure the createdBy field is a valid UUID
        notNull: { msg: 'CreatedBy is required' },
      },
    },
  });

  return Event;
};