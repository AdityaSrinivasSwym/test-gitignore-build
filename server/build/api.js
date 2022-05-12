const express = require("express");
const app = express();
const port = 5050;
const axios = require("axios");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/node", function (req, res) {
  get_url =
    "https://shopify-appdev.swymrelay.com/charges.php?siteurl=" +
    req.body["m-url"] +
    "&appname=" +
    req.body["app-name"] +
    "&plan=" +
    req.body["plan"] +
    "&trial=" +
    req.body["trial"] +
    "&price=" +
    req.body["price"] +
    "&isannual=" +
    req.body["annual"];

  var link;
  axios.get(get_url).then((response) => {
    link = response.data;
    console.log(link);
    res.format({
      "text/html": function () {
        res.send(link);
      },
    });
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
