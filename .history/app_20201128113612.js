const express = require("express");
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
    if (req.method == "GET") {
      let entity = req.params.entity;
      if (entity == "loan") {
        const entityQuery =  Entity.findOne({"name" : entity}).then(() => null, err => err);
        entityQuery.getFilter();
        const doc = await entityQuery.exec();

        let dataArray = doc.data;
        dataArray.push(req.body);

        Entity.updateOne({name : entity}, {data: dataArray},function(err,result){
            if(err){
                res.send(err);
            }else{
                res.json(result);
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
    }
    res.send(req.params);
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
        if (entity == "loan") {
          const entityQuery =  Entity.findOne({"name" : entity}).then(() => null, err => err);
          entityQuery.getFilter();
          const doc = await entityQuery.exec();
  
          let dataArray = doc.data;
          dataArray.push(req.body);
  
          Entity.updateOne({name : entity}, {data: dataArray},function(err,result){
              if(err){
                  res.send(err);
              }else{
                  res.json(result);
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
      }
      res.send(req.params);
    }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
