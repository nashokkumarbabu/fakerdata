const express = require("express");
const app = express();
const port = 3000;
const Entity = require("./Entity");

//DB setup
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//DB setup

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all(
  "/api/:entity/:entityId",
  function (req, res, next) {
    console.log("METHOD :: "+req.method);
    next(); // pass control to the next handler
  },
  function (req, res) {
    if(req.method == "GET"){

    }else if(req.method == "POST"){

        const user = new Entity({
            firstname: req.body.firstname,
            lastname: req.body.lastname
          });
          try {
            const newUser = await user.save();
            res.status(201).json({ newUser });
          } catch (err) {
            res.status(400).json({ message: err.message });
          }

    }else if(req.method == "PUT"){

    }else if(req.method == "GET"){

    }
    res.send(req.params);
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
