PDF Rule Checker

A full-stack application that allows users to upload a PDF and verify whether it follows a set of custom rules using an LLM (Gemini / OpenAI / any model you choose).
The backend extracts the PDF text, sends it to an LLM with the rules, and returns a structured result to the frontend.

📌 Features

✔ Upload a PDF document
✔ Enter multiple custom rules
✔ Backend extracts text & sends it to an LLM for rule checking
✔ Returns structured results:

Rule

Status (pass/fail)

Evidence

Reasoning

Confidence Score

✔ Frontend displays everything in a clean, modern UI using React + Tailwind CSS
✔ Easy setup, configurable API keys via .env

📂 Project Structure
```
/project-root
│
├── backend/          # Node.js + Express backend
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/         # React + Tailwind CSS UI
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   └── ResultTable.jsx
    ├── index.html
    └── package.json
```
🚀 Setup Instructions

Follow these steps after cloning the repository:

1️⃣ Clone the Repository
```
git clone <your-repo-url>
cd <project-folder>
```

🖥️ Backend Setup
cd backend
```
npm install
```

Create .env file
```
PORT=5000
LLM_API_KEY=your_llm_api_key_here
```


LLM_API_KEY can be Gemini API key, OpenAI API key, or any LLM provider key you use.

Start Backend
```
npm start
```


Backend will run on:
👉 http://localhost:5000

🌐 Frontend Setup
```
cd ../frontend
npm install
```

Start Frontend
```
npm run dev
```


Frontend will run on:
👉 http://localhost:5173
 (Vite)
or
👉 http://localhost:3000
 (CRA)

🔧 Environment Variables
```
Backend .env
Key	Description
PORT	Backend server port
LLM_API_KEY	API key for LLM provider (Gemini/OpenAI/etc.)

```

🛠️ Tech Stack
Frontend

React

Tailwind CSS

Vite (or CRA)

Backend

Node.js

Express.js

Multer (PDF upload)

PDF Parsing library (pdf-parse / pdfjs)

Google Gemini / OpenAI LLM (via API)

🧠 How It Works
1. User uploads PDF
2. User enters rules
3. Backend extracts text from PDF
4. Backend sends text + rules to an LLM
5. LLM analyzes document & returns:

Pass/Fail

Evidence from PDF

Explanation

Confidence

6. Frontend displays results in a styled table 🎉
