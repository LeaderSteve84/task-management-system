const app = require('./app/app');
const db = require("./src/db/dbConnection");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
    await db(MONGO_URI);
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
});
