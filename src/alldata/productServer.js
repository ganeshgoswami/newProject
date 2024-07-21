var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let data = require("./productData.js");

app.get("/products", function (req, res) {
  res.send(data);
});

app.get("/products/:id", function (req, res) {
  let id = +req.params.id;
  let search = data.allProducts.find((n) => n.id === id);
 res.send(search);
  console.log(search);
});
