import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectToPostgres from "./postgresDB/connect.js";
import { postgresConfig } from "./postgresDB/config.js";
import sequelize from "./postgresDB/sequelize.js";

// Importing all modules routes
import userRouter from "./server/modules/User/index.js";

dotenv.config({ quiet: true });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Health Check endpoint
app.get("/", (req, res) =>
  res.json({ message: "Hello from Sequelize Refresher!" })
);

// Importing all modules routes
app.use("/users", userRouter);

const startServer = async () => {
  try {
    // Connecting to postgres and storing the client in config
    await connectToPostgres();

    // use { force: true // this drops whole table } or { alter: true // only update the changed part of models } as needed
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized with the database");

    postgresConfig.client = sequelize;

    const PORT = process.env.PORT || 8081;

    app.listen(PORT, () => {
      console.log(`🟢 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ ", error);
    process.exit(1);
  }
};

startServer();
