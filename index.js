import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import { cont1, cont2 } from "./controllers/cont.js";

const app = express();

app.use(json());
app.use(cors());

app.get("/", cont1);

const data = { name: "anoop", edu: "vit" };

app.get("/json", cont2);
app.listen(process.env.PORT, () => {
  console.log("server running on 300");
});
