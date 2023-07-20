import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import storyRoutes from "./routes/storyRoutes.js";
import tellerRoutes from "./routes/tellerRoutes.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/stories", storyRoutes);
app.use("/teller", tellerRoutes);

const MONGO_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Serving on port ${PORT}`)))
  .catch((error) => console.log(error.message));
