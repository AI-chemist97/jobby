const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Jobby server is running");
});

app.listen(PORT, () => {
  console.log(`Jobby server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.get("/intro", (req, res) => {
  res.send("이 엔드포인트에는 나중에 자기소개 문구가 들어갈 예정입니다.");
});
