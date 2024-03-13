const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/customers", (req, res) => {
  console.log("POST 완료!!");
  const { file, name, birthday, gender, job } = req.body;
  console.log("[info]",file,name,birthday,gender,job);//모두 undefined 들어오네;;
});

app.listen(port, () => console.log(`Listening on port ${port}`));
