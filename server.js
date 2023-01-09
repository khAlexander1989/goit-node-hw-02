const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3000, DB_CONTACTS } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
