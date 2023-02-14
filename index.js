const express = require("express");
const redis = require("redis");
const app = express();
const port = 4001;
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

// client.on("error", (err) => console.log("Redis Client Error", err));
(async () => await client.connect())();
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) {
      console.log("//////////////////////////////////");
      console.log(err);
    }
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

// app.get("/", (req, res) => {
//     res.send("Hello World!");
//     });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
