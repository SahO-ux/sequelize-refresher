import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "../../../postgresDB/sequelize.js";

const SALT_ROUNDS = 10;

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      //   defaultValue: "John",
      set(value) {
        this.setDataValue("firstName", value.trim());
      },
      //   get() {
      //     const rawStr = this.getDataValue("firstName");

      //     return rawStr.toUpperCase();
      //   },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("lastName", value.trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email" },
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email cannot be empty" },
      },
      set(value) {
        this.setDataValue("email", value.trim().toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users", // optional: custom table name (recommended)
    timestamps: true, // adds createdAt and updatedAt columns
    // updatedAt: false // disable updatedAt if not needed in table
    paranoid: true, // enables soft deletes by adding deletedAt column
    // updatedAt: 'modifiedAt' // customize the name of the updatedAt column

    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
    },
  }
);

// Instance method for verifying password
User.prototype.isPasswordValid = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

export default User;
