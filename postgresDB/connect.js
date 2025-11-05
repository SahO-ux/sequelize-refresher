import sequelize from "./sequelize.js";

const connectToPostgres = async () => {
  await sequelize.authenticate();
  console.log("✅ Connection has been established successfully.");
};

export default connectToPostgres;
