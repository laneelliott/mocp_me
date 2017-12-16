module.exports = function(sequelize, DataTypes) {
  var Tags = sequelize.define("tags", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tag_name: {
      type: DataTypes.STRING
    },
    photo_id: {
    	type: DataTypes.INTEGER
    }
  });

  // Tags.associate = function(models) {
  //   // We're saying that a Tags should belong to an Photos
  //   // A Tags can't be created without an Photos due to the foreign key constraint
  //   Tags.belongsTo(models.Photos, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Tags;
};
