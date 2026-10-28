# DevOps Midterm Assignment: Express Submission Portal & Automated CI/CD Pipeline

## Project Overview
This repository contains a full-stack Node.js/Express assignment submission portal integrated with a GitHub Actions CI/CD pipeline and a local webhook test report receiver.

---

## Student Details
- **Name:** Mohsin Hayat
- **Repository Name:** devops-midTerm
- **Course:** CSC418 - DevOps

---

## Prerequisites
Before running the application, ensure you have the following installed on your machine:
- **Node.js** (v18.x or higher)
- **npm** (Node Package Manager)
- **Git**

---

## Project Structure
```text
assignment-portal/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD workflow configuration
├── test/
│   └── app.test.js        # Jest unit test suite
├── app.js                 # Main Express submission portal application logic
├── server.js              # Express server starter script
├── receiver.js            # Local webhook receiver for CI test reporting
├── index.html             # Web portal frontend user interface
├── package.json           # Project dependencies and script runner
└── README.md              # Project documentation and setup instructions
Setup & Running Instructions
1. Installation
Clone the repository and install all required project dependencies:

Bash
git clone [https://github.com/mohsinhayat11/devops-midTerm.git](https://github.com/mohsinhayat11/devops-midTerm.git)
cd devops-midTerm/assignment-portal
npm install
2. How to Run the Submission Portal
Start the Express web portal server:

Bash
npm start
Local Access: Open http://localhost:3000 in your browser.

Functionality: Allows students to submit Name, Registration Number, Assignment Title, and Submission URL. Input fields are validated and submissions are displayed dynamically.

3. How to Execute Automated Tests
Run the Jest unit testing suite to verify backend endpoints:

Bash
npm test
Executes all unit tests in test/app.test.js non-interactively.

4. How to Start the Local Report Receiver
Start the local Express server to receive test reporting webhooks from GitHub Actions:

Bash
npm run receiver
Local Webhook URL: http://localhost:4000/webhook

Functionality: Listens for incoming test metrics JSON payload from CI pipeline and automatically writes test-report.json to the local directory.

CI/CD Pipeline & Localtunnel Setup
Start Localtunnel:
Expose port 4000 to the internet for GitHub Actions using Localtunnel:

Bash
npx localtunnel --port 4000
Update Workflow:
Copy the generated public URL (e.g., https://pretty-olives-clean.loca.lt) and update the curl endpoint in .github/workflows/ci.yml.

Trigger Pipeline:
Push code changes to the main branch to trigger automated testing and report delivery.


---

### **GitHub par push karne ki commands:**

VS Code terminal mein yeh chala kar push kar dein:

```bash
git add README.md
git commit -m "Add complete README documentation"
git push