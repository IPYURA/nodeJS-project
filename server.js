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

const multer = require("multer"); //multer 확장자 유지해서 저장??
// const upload = multer({ dest: "./upload" }); //이 한줄이 원래 코드
const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage: storage }); //const storage부터 여기까지가 이후 코드

app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use("/image", express.static("./upload")); //upload 폴더를 공유할 수 있도록
//upload폴더에 직접적으로 접근할 수 없도록 image라는 경로로 표시하고 실제 연결되는 폴더를 upload로 해주는 거

app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = "/image/" + req.file.filename; //파일의 저장위치 주소를 sql에 저장 //!!이 부분 "/image" 였는데 내가 고침
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  //   console.log("[data]:", image,name,birthday,gender,job);
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows); //client에게 메세지 전달
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = `UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?`;
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// const path = require("path");
// const publicPath = path.join(__dirname, "public");
// app.use(express.static(publicPath));
// const upload = multer({
//   storage: multer.diskStorage({
//     filename(req, file, done) {
//       console.log(file);
//       done(null, file.originalname);
//     },
//     destination(req, file, done) {
//       console.log(file);
//       done(null, path.join(__dirname, "public"));
//     },
//   }),
// });
