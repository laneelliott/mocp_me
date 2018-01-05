module.exports = function(sequelize, DataTypes) {
  var Hashtags = sequelize.define("Hashtags", {
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
  }, {
    timestamps: false
  });

  return Hashtags;
};
