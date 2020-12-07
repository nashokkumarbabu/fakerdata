const express = require("express");
const app = express();
const port = 3000;

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
        
    }else if(req.method == "PUT"){

    }else if(req.method == "GET"){

    }
    res.send(req.params);
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
