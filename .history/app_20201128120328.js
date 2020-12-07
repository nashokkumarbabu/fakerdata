const express = require("express"),bodyParser = require('body-parser');;
const app = express();
const port = 3000;
const Entity = require("./Entity");

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

app.get(
  "/api/:entity/:entityId",
  function (req, res, next) {
    console.log("METHOD :: " + req.method);
    next(); // pass control to the next handler
  },
  async function (req, res) {
   
      let entity = req.params.entity;
      
        const entityQuery = Entity.findOne({ name: entity }).then(
          () => null,
          (err) => err
        );
        entityQuery.getFilter();
        const doc = await entityQuery.exec();
        res.send(doc.data)

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
        
          const entityQuery = Entity.findOne({ name: entity }).then(
            () => null,
            (err) => err
          );
          entityQuery.getFilter();
          const doc = await entityQuery.exec();
          res.send(doc.data)
  
   
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
      console.log(entity + " :: entity");

      const entityQuery = Entity.findOne({ name: entity }, function (err, doc) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(doc);
          //res.json(doc);
            let dataArray = doc.data;
            dataArray.push(req.body);
            console.log(dataArray);

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

      // const entity = new Entity({
      //   name: "Loan",
      //   data: [
      //     {
      //       loanNumber: "L123",
      //     },
      //   ],
      // });
      // try {
      //   const newUser = await user.save();
      //   res.status(201).json({ newUser });
      // } catch (err) {
      //   res.status(400).json({ message: err.message });
      // }
    }
    //res.send(req.params);
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
