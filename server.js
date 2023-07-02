const dotenv = require("dotenv");

const { app } = require("./app");

const { initModels } = require("./models/initModels");
const { db } = require("./utils/database.utils");

dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("db connect");

    initModels();

    await db.sync();
    console.log("db sync");

    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express app running 😁!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
