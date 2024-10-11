require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./config/logger");
const app = express();
const session = require("express-session");
const router = express.Router();

const domainRelease = process.env.DOMAIN_RELEASE
const domainDev = process.env.DOMAIN_DEV
const domainLocal = process.env.DOMAIN_LOCAL
app.use("/",
  cors({
    origin: [domainRelease, domainLocal, domainDev],
    credentials: true,
  }), router
);

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const http = require("http").createServer(app);

// connect to mongodb
const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to Mongo!");
  })
  .catch((err) => {
    logger.error(`Error connecting to Mongo: ${err}`);
  });

// routes
app.use("/api", require("./routers/index"));

const PORT = process.env.PORT || 6000;
http.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
