import { DataTypes } from "sequelize";

export default function(sequelize) {
  sequelize.define("Favorite", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    species: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isURL: true
      }
    },
    location: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
}