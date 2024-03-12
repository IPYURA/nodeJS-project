const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/hello", (req, res) => {
//   res.send({ message: "Hello Express!!" });
// });

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: "1",
      name: "조동건",
      image: "https://picsum.photos/id/259/64/64",
      birth: "980413",
      gender: "남",
      job: "대학생",
    },
    {
      id: "2",
      name: "강민주",
      image: "https://picsum.photos/id/223/64/64",
      birth: "981007",
      gender: "여",
      job: "대학생",
    },
    {
      id: "3",
      name: "이름이",
      image: "https://picsum.photos/id/227/64/64",
      birth: "981112",
      gender: "여",
      job: "대학생",
    },
    {
      id: "4",
      name: "네번째",
      image: "https://picsum.photos/id/210/64/64",
      birth: "981102",
      gender: "남",
      job: "대학생",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
