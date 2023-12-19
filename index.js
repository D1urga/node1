import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { cont1, cont2 } from "./controllers/cont.js";
import { mod1model } from "./models/mod1.js";
import { Publisher } from "./models/pub.js";
import request from "express";
import fetch from "node-fetch";
import { Book } from "./models/book.js";

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

app.post("/addPublisher", async (req, res) => {
  const publisher = new Publisher(req.body);
  await publisher.save();
  res.status(201).json({ success: true, data: publisher });
});

app.post("/mydata", async (req, res) => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set("txn_id", "17c6fa41-778f-49c1-a80a-cfaf7fae2fb8");
    encodedParams.set("consent", "Y");
    encodedParams.set("uidnumber", req.body.adharNum);
    encodedParams.set("clientid", "222");
    encodedParams.set("method", "uidvalidatev2");

    const url =
      "https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "3577e126dcmshc1e36847e731418p1c45d2jsnac89ee32afe4",
        "X-RapidAPI-Host": "verifyaadhaarnumber.p.rapidapi.com",
      },
      body: encodedParams,
    };
    const response = await fetch(url, options);
    const result = await response.text();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
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
