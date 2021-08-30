import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pusher from "pusher";

const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, (req, res) => {
  console.log("api");
});
