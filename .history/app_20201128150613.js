const express = require("express"),
  bodyParser = require("body-parser");
const app = express();

const port = 3000;
const Entity = require("./Entity");
const util = require("./util/schema.service");



//DB setup
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
//DB setup

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generatedata/:entity", async (req, res) => {
  let entity = req.params.entity;
  
  const entityQuery = Entity.findOne({ name: entity }, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(doc);
      // use the async-version (preferred way)
      let generatedFakeData = util.getFakeSchema(doc);
      console.log(generatedFakeData +" :: generatedFakeData");
      Entity.updateOne(
        { name: entity },
        { data: generatedFakeData },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
    }
  });
});

app.get(
  "/api/:entity/:entityId",
  function (req, res, next) {
    console.log("METHOD :: " + req.method);
    next(); // pass control to the next handler
  },
  async function (req, res) {
    let entity = req.params.entity;
    let entityId = req.params.entityId;
    const entityQuery = Entity.findOne({ name: entity }, function (err, doc) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(doc);
        let dataArray = doc.data.filter(function (e) {
          return e._fid == entityId;
        });
        res.json(dataArray[0]);
      }
    });
  }
);

app.get(
  "/api/:entity",
  function (req, res, next) {
    console.log("METHOD :: " + req.method);
    next(); // pass control to the next handler
  },
  async function (req, res) {
    let entity = req.params.entity;

    const entityQuery = Entity.findOne({ name: entity }, function (err, doc) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(doc);
        res.json(doc.data);
      }
    });
  }
);

app.post(
  "/api/:entity",
  function (req, res, next) {
    console.log("METHOD :: " + req.method);
    next(); // pass control to the next handler
  },
  async function (req, res) {
    if (req.method == "GET") {
    } else if (req.method == "POST") {
      let entity = req.params.entity;
      const entityQuery = Entity.findOne({ name: entity }, function (err, doc) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(doc);
          //res.json(doc);
          let dataArray = doc.data;
          req.body._fid = new mongoose.mongo.ObjectId();
          dataArray.push(req.body);
          Entity.updateOne(
            { name: entity },
            { data: dataArray },
            function (err, result) {
              if (err) {
                res.send(err);
              } else {
                res.json(result);
              }
            }
          );
        }
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
