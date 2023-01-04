const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const port = process.env.PORT | 5000;
const ObjectId = require("mongodb").ObjectId;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());
const UPLOADS_FOLDER = "./public/images";

// mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hbgsph3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("Hello I am from the ");
});
async function run() {
  try {
    await client.connect();
    const workCollection = client.db("my_portfolio").collection("works");

    app.use("/public/images", express.static("public/images"));
    app.get("/works", async (req, res) => {
      const cursor = workCollection.find({});
      const works = await cursor.toArray();
      res.send(works);
    });
  } finally {
    // await client.connect()
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log("Server is running in the port", port);
});
