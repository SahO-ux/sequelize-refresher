import { Sequelize } from "sequelize";
import { postgresConfig } from "./config.js";

const sequelize = new Sequelize(postgresConfig.options);

export default sequelize;
