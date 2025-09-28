const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const config = require("../config/dev");

const projectId = config.googleProjectID;
const sessionLanguageCode = config.dialogFlowSessionLanguageCode;

// 텍스트 질문을 Dialogflow에 보내고, 응답을 그대로 돌려주는 함수
async function textQuery(userText, sessionId = uuid.v4()) {
  // 세션 클라이언트 생성
  const sessionClient = new dialogflow.SessionsClient({
    projectId,
    credentials: {
      client_email: config.googleClientEmail,
      private_key: config.googlePrivateKey,
    },
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userText,
        languageCode: sessionLanguageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

module.exports = {
  textQuery,
};
