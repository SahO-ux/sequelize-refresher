export const postgresConfig = {
  options: {
    host: process.env.PG_HOST || "localhost",
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || "dev",
    dialect: "postgres",
    username: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "admin",

    // Logging:- Default, displays the first parameter of the log function call
    logging: console.log,
  },
  client: null,
};
