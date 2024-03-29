const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const itemRouter = require("./routes/item");
const mongoose = require("mongoose");
const { isAuth, verifyToken } = require("./utils/middleware");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({origin:config.ORIGIN, credentials: true}));
app.use(express.json());
app.use(cookieParser(config.COOKIE_SECRET))

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

app.use("/api/users",isAuth, verifyToken, userRouter);
app.use("/api/auth", authRouter);
app.use("/api/blogs", itemRouter);

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
