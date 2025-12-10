require("dotenv").config();
const express = require("express");
const { textQuery } = require("./dialogflow/dialogflowClient");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); //json 바디 읽기

app.get("/", (req, res) => {
  res.send("Jobby server is running");
});

app.post("/api/dialogflow/textQuery", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "text 필드가 필요합니다." });
    }

    const dialogflowResponse = await textQuery(text);

    res.json({
      queryText: dialogflowResponse.queryResult.queryText,
      intent: dialogflowResponse.queryResult.intent.displayName,
      fulfillmentText: dialogflowResponse.queryResult.fulfillmentText,
      raw: dialogflowResponse,
    });
  } catch (error) {
    console.error("Dialogflow textQuery error:", error);
    res.status(500).json({ error: "Dialogflow 요청 중 오류가 발생했습니다." });
  }
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.get("/intro", (req, res) => {
  res.send("이 엔드포인트에는 나중에 자기소개 문구가 들어갈 예정입니다.");
});
app.listen(PORT, () => {
  console.log(`Jobby server is running on port ${PORT}`);
});
