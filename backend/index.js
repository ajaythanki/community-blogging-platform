const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb', extended: true })); // limit is set to 50MB, and the extended option allows nested objects in the JSON body

app.use(middleware.requestLogger);

mongoose.set("strictQuery", false);
mongoose.set("debug", true);

const options = {
  autoIndex: false, 
  maxPoolSize: 50, 
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4,
  dbName: config.MONGO_DB_NAME,
};

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);

const port = config.PORT || 8080;

mongoose
  .connect(config.MONGODB_URI, options)
  .then((connection) => {
    logger.info(`connected to : ${connection.connection.host}`);
  })
  .catch((err) => logger.error(err));

app.listen(port, () => {
  logger.error(`Server running on ${port}`);
});

app.use(middleware.errorMiddleware);
