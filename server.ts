import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import listRouteTodo from "./routes/Todo";
import listRouteItem from "./routes/Item";

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", listRouteTodo);
app.use("/api", listRouteItem);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
