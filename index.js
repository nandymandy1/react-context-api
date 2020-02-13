const cors = require("cors");
const express = require("express");
const passport = require("passport");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");
const { success, error } = require("consola");

const { DB, PORT } = require("./config");

// Initiaize Express app
const app = express();

// Application Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// Application Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const startServer = async () => {
  try {
    await connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    success({
      message: `Connected to the database successfully. \n${DB}`,
      badge: true
    });
    app.listen(PORT, () =>
      success({
        message: `Server started on port ${PORT}`,
        badge: true
      })
    );
  } catch (err) {
    error({
      message: `Unable to start server \n${err}`,
      badge: true
    });
  }
};

startServer();
