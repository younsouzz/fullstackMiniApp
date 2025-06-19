# 💬 FullstackMiniApp

A simple fullstack chat application built with React Native (Expo) on the frontend and Node.js (Express) on the backend.

---

## 🧱 Tech Stack

### Frontend (Mobile)
- [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- TypeScript
- Axios

### Backend (API)
- Node.js
- Express
- CORS
- Message persistence in a `messages.json` file

---

## 🚀 Features

- Minimalist real-time chat interface
- Send and retrieve messages through a REST API
- Messages are saved locally in `messages.json`
- Compatible with Android, iOS, and Web via Expo

---

## 📁 Project Structure

fullstackMiniApp/
├── app/ # Expo Router pages
│ └── index.tsx # Main chat screen
├── assets/ # Assets (fonts, images)
├── components/ # Reusable UI components
├── messages.json # JSON file for message persistence
├── index.js # Node.js Express backend
├── package.json # Project dependencies & scripts


---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd fullstackMiniApp
2. Install dependencies
npm install
🧪 Running the App

✅ One command: frontend + backend
Install concurrently:
npm install --save-dev concurrently
Add this script to your package.json:
"scripts": {
  "dev": "concurrently \"node index.js\" \"npx expo start\""
}
Start both:
npm run dev
Backend runs on: http://localhost:4000
Expo Dev Server starts with QR code for device/simulator
🔌 Running Backend Only

node index.js
API Routes:
GET /messages → Fetch all messages
POST /messages → Send a new message { text: string }
📱 Running Frontend Only

npx expo start
Use a simulator or scan the QR code with Expo Go on your phone.

⚠️ Notes

If you're testing on a real mobile device, replace localhost in your frontend code with your local IP address, e.g.:
const BACKEND_URL = 'http://192.168.X.X:4000';
Messages are saved to messages.json. Restarting the backend keeps previously saved messages.
✍️ Author

Youness