module.exports = {
  // Your PostgreSQL connection string
  connectionString: "postgres://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME",

  // The path where the types should be generated
  outputDirectory: "./generated",

  // Other configurations
  typegen: {
    // If you're using @slonik/typegen-operations, include it as a plugin
    plugins: ["@slonik/typegen-operations"],
  },
};
