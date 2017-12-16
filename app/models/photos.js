module.exports = function(sequelize, DataTypes) {
  var Photos = sequelize.define("photos", {
    // Giving the Photos model a name of type STRING
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    path: {
      type: DataTypes.STRING
    },
    web_path: {
      type: DataTypes.STRING
    },
    artist_id: {
      type: DataTypes.INTEGER
    }
  });

  // Photos.associate = function(models) {
  //   // Associating Photos with Posts
  //   // When an Photos is deleted, also delete any associated Posts
  //   Photos.hasMany(models.Tags, {
  //     onDelete: "cascade"
  //   });
  // };

  return Photos;
};
