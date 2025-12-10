# 💬 Jobby – Interactive Portfolio Chatbot

Jobby는 AI-Chemist97의 이력과 프로젝트 정보를 대화 형식으로 소개하는 **포트폴리오용 챗봇 웹 애플리케이션**입니다.  
사용자는 자연어로 질문을 입력하고, 백엔드 서버를 통해 Dialogflow 엔진에서 생성한 응답을 실시간으로 받아볼 수 있습니다.

> 아직 완벽한 완료는 아니고 계속 사용해보면서 제 정보와 서버나 ui/ux를 업데이트 중입니다!

> “문서 대신, 봇에게 물어보는 포트폴리오”

---

## 🚀 Live Demo

- Frontend (Vercel): https://jobby-henna.vercel.app/
- Backend (Render): 비공개 환경변수 기반 API 서버 사용

---

## 🧩 주요 기능 (Features)

- 포트폴리오/이력 기반 질의응답 챗봇
- 말풍선 형태의 대화 UI 및 자동 스크롤
- 입력 중에도 계속 타이핑 가능한 UX
- 프론트/백 분리 배포(Vercel + Render)

---

## 🛠 Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Chatbot Engine:** Dialogflow (Google Cloud)
- **Infra:** Vercel (Frontend Hosting), Render (Backend Hosting)

---

## 🏃‍♂️ 로컬 실행 방법

### 1. 클라이언트(Frontend)

```
git clone https://github.com/AI-chemist97/jobby.git
cd jobby/client
npm install
npm run dev
```

`.env` (client) 예시:

```
VITE_API_URL=http://localhost:5000
```

### 2. 서버(Backend)

```
cd jobby/server
npm install
npm run dev # 또는 npm start
```

`.env` (server) 예시:

```
PORT=5000
DIALOGFLOW_PROJECT_ID=...
DIALOGFLOW_CLIENT_EMAIL=...
DIALOGFLOW_PRIVATE_KEY=...
DIALOGFLOW_LANGUAGE_CODE=ko
```

> 실제 키 값은 Git에 커밋하지 않고, 로컬 `.env`와 Render 환경변수로만 관리합니다.

---

## 📦 배포 구조

- **Vercel (Frontend)**
  - Root: `client`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Env: `VITE_API_URL=https://<Render-Backend-URL>`

- **Render (Backend)**
  - Node Web Service (`server` 디렉토리)
  - Env: `DIALOGFLOW_*` 관련 키 및 `PORT`

---

## 📚 기타

- 이 프로젝트는 포트폴리오/면접용 데모를 위한 실험적인 챗봇 프로젝트입니다.
- 상세 구현 내용 및 다이어그램은 추후 위키/문서에 추가 예정입니다.


> 일부 문서화 및 코드 리팩토링 과정에서 AI 도구를 적극 활용했으며, 답변을 그대로 복붙하기보다 직접 이해·수정하는 방향으로 사용했습니다.
