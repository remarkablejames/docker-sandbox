const express = require("express");
const redis = require("redis");
const app = express();
const port = 3000;
const client = redis.createClient();
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
