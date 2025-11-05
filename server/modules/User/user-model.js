import { DataTypes } from "sequelize";

import sequelize from "../../../postgresDB/sequelize.js";

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      //   defaultValue: "John",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users", // optional: custom table name (recommended)
    timestamps: true, // adds createdAt and updatedAt columns
    // updatedAt: false // disable updatedAt if not needed in table
    // paranoid: true, // enables soft deletes by adding deletedAt column
    // updatedAt: 'modifiedAt' // customize the name of the updatedAt column
  }
);

export default User;
