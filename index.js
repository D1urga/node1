import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import { cont1, cont2 } from "./controllers/cont.js";
import { mod1model } from "./models/mod1.js";
import { Publisher } from "./models/pub.js";
import request from "express";
import fetch from "node-fetch";
import { Book } from "./models/book.js";
import { Dev } from "./models/dev.js";
import { User } from "./models/user.js";
import { Car } from "./models/cars.js";
import { TestModel } from "./models/testingmodel.js";
import { TestModel1 } from "./models/testmodel2.js";
import { PipelineModel } from "./models/pipelineModel.js";
import { ImageModel } from "./models/images.js";
import { Subscription } from "./models/subs.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", cont1);

app.use("/images", express.static("public"));

app.post("/profile", upload.single("avatar"), function (req, res, next) {
  const data = ImageModel({ imageName: req.file.filename });
  data.save();
  res.json({ data: req.file });
});

app.get("/imges", (req, res) => {
  res.json({ data: "./public" });
});

app.post("/posttest", (req, res) => {
  const data = TestModel(req.body);
  data.save();
  res.json({ mydata: data });
});
app.get("/test1", async (req, res) => {
  const user = await TestModel1.findById("6586810a9fd747ade549efac");
  const updated = user.updateName("chaudhary");
  user.save();
  console.log(updated);
  res.json({ data: user });
});
app.post("/posttest1", (req, res) => {
  const data = TestModel1(req.body);
  data.save();
  res.json({ mydata: data });
});
app.get("/gettestdata", (req, res) => {
  const data = TestModel.find({});
  res.json({ data: data });
});

app.post("/postusers", async (req, res) => {
  const usersdata = await User(req.body);
  await usersdata.save();
  res.json({ data: usersdata });
});

app.post("/postcars", async (req, res) => {
  const cardata = await Car(req.body);
  await cardata.save();
  res.json({ data: cardata });
});

// app.post("/addcars" , (req , res)=>{
//    const car = new Car(req.body)
// })

app.post("/addcars/:id", async (req, res) => {
  const { id } = req.params;
  const userdata = await User.findById(id);
  const cardata = await Car(req.body);
  userdata.cars.push(cardata);
  await cardata.save();
  await userdata.save();
  res.json({ data: userdata.cars });
});

app.get("/popmethod/:id/:index", async (req, res) => {
  const { id, index } = req.params;
  const data = await User.findById(id).populate("cars");
  const data2 = data.cars;
  res.json({ data: data });
});

app.post("/data", async (req, res) => {
  const val = { name: req.body.name };
  val.save();
  res.json({ data: val });
});
app.get("/fetchdata", async (req, res) => {
  const mydata = await mod1model.find({});
  res.json({ data: mydata });
});

app.get("/del/:id", async (req, res) => {
  const { id } = req.params;
  const mydata = await mod1model.aggregate([{ $skip: Number(id) }]);
  res.json({ data: mydata });
});
app.delete("/del/:id", async (req, res) => {
  const { id } = req.params;
  const mydata = await mod1model.findByIdAndDelete(id);
  res.json({ data: mydata });
});

app.get("/testapi", async (req, res) => {
  const mydata = await mod1model.aggregate([
    { $skip: 0 },
    { $match: { name: "anoop kumar chaudhary" } },
  ]);
  res.json({ data: mydata });
});

app.post("/devs", async (req, res) => {
  const val = Dev({
    name: req.body.name,
    age: req.body.age,
    tech: req.body.tech,
    workExp: req.body.workExp,
  });
  await val.save();
  res.status(201).json({ success: true, data: val });
});
app.get("/getdevs", async (req, res) => {
  const data = await Dev.find({});
  res.json({ data: data });
});

app.post("/addPublisher", async (req, res) => {
  const publisher = new Publisher(req.body);
  await publisher.save();
  res.status(201).json({ success: true, data: publisher });
});
app.post("/addBook", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json({ success: true, data: book });
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

app.post("/postPipeline", async (req, res, next) => {
  const data = await PipelineModel(req.body);
  await data.save();
  console.log(req.file);
  res.json({ data: data });
});
app.post("/postSubs", async (req, res) => {
  const data = await Subscription(req.body);
  data.save();
  res.json({ data: data });
});

app.get("/getsub", async (req, res) => {
  const data = await Subscription.find({});
  res.json({ data: data });
});
app.get("/getchannels/:id", async (req, res) => {
  const { id } = req.params;
  const user = await PipelineModel.aggregate([
    {
      $match: {
        $expr: { $eq: ["$_id", { $toObjectId: id }] },
      },
    },

    { $skip: 0 },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "my channels",
      },
    },
  ]);
  res.json({ data: user });
});
app.get("/pipelineData", async (req, res) => {
  const data = await PipelineModel.aggregate([
    { $skip: 0 },
    {
      $match: {
        age: { $gte: 25 },
        $or: [
          { firstName: "anoop" },
          { firstName: "anoop1" },
          { firstName: "anoop2" },
        ],
      },
    },
  ]);
  res.json({ data: data });
});

app.get("/json", cont2);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected to database");
  app.listen(process.env.PORT, () => {
    console.log("listening on 3000");
  });
});
