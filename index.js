import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { cont1, cont2 } from "./controllers/cont.js";
import { mod1model } from "./models/mod1.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", cont1);

app.post("/data", async (req, res) => {
  const val = { name: req.body.name };
  const created = await mod1model.create(val);
  res.send(created);
});
app.get("/fetchdata", async (req, res) => {
  const mydata = await mod1model.find({});
  res.json({ data: mydata });
});

const data = { name: "anoop", edu: "vit" };

app.get("/json", cont2);
mongoose
  .connect(
    "mongodb+srv://anoop:anoop123@db1.ohpfv6l.mongodb.net/databases?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
      console.log("listening on 3000");
    });
  });
