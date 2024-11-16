const express = require("express");
const dotenv = require("dotenv");
import("./mongodb.js");
const cors = require("cors");
const cookie = require("cookie-parser");

//import routes
const Authroute = require("./routes/authroute.js");
const Patientroute = require("./routes/patientroute.js");
//import models
const adminmodel = require("./models/superadmin.js");

const seed = require("./seed.js");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookie());

dotenv.config();

app.use("/auth", Authroute);
app.use("/patient", Patientroute);

const PORT = 8080;
app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.listen(PORT, () => {
  console.log("server is running on port-", PORT);
});
