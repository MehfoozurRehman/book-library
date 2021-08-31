import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import pusher from "pusher";

import bookModal from "./bookModal.js";

// api config

const app = express();
const port = process.env.PORT || 9000;

// middlewares

app.use(express.json());
app.use(cors());

// mongodb config

mongoose.connect(
  "mongodb+srv://admin:uXgxhfQAsWOufF7Y@cluster0.54e4d.mongodb.net/booksdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

// api endpoints

app.get("/", (req, res) => {
  res.send("api working");
});

app.post("/v1/createBook", (req, res) => {
  let data = req.body;
  bookModal.create(data, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/v1/findAllBooks", (req, res) => {
  bookModal.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v1/deleteAllBooks", (req, res) => {
  bookModal.remove((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// api listem

app.listen(port, (req, res) => {
  console.log("api");
});
