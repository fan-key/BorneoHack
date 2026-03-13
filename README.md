# TaniWise – AI Crop Disease Detection

TaniWise is an AI-powered mobile application designed to educate farmers about crop diseases and sustainable farming practices.

By scanning plant leaves with a smartphone, farmers can receive instant AI-powered diagnosis, along with clear treatment steps and prevention strategies. The goal is not only to detect plant diseases, but also to teach farmers how to manage crop health and improve long-term food security.

This project was built using React Native (Expo) and Google Gemini AI.

## 🏗Project Architecture

```bash
project-root
│
├── app/                 # React Native Expo mobile app
│   ├── (tabs)/
│   │   ├── scan.tsx
│   │   ├── history.tsx
│   │   ├── library.tsx
│   │   └── index.tsx
│   │
│   ├── result.tsx
│   └── _layout.tsx
│
├── backend/             # Node.js AI backend server
│   ├── src/
│   │   ├── routes/
│   │   │   └── diagnose.js
│   │   ├── services/
│   │   │   ├── gemini.js
│   │   │   ├── imageOptimizer.js
│   │   │   └── requestQueue.js
│   │   └── index.js
│   │
│   └── .env
│
└── config.ts            # Backend configuration
```

## ⚙️Installation
### 1. Install Dependencies
```bash
npm install
```
### Backend Setup

Navigate to the backend folder:
```bash
cd backend
npm install
```
Create a ```.env``` file inside the backend folder:
```
PORT=3000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```
Start the backend server:
```
node src/index.js
```
Expected output:
```
Server running on port 3000
```
### 📱Mobile App Setup

Start the Expo development server:
```
npx expo start
```
You can open the app using:

- Android Emulator

- iOS Simulator

- Expo Go on a mobile device

### 🔧Backend URL Configuration

Edit ```config.tsx``` to point to your backend server:
```
export const BACKEND_URL = "http://192.xxx.x.x:3000";
```
Use your computer's IPv4 address, not localhost.

## Figma Prototype
[Figma Prototype](https://www.figma.com/proto/MAaB93YKT9hm8Sxjb3dn6C/TaniWise--BorneoHck-?node-id=41-879&t=oiEF32qR3CoFJk2D-1&scaling=scale-down&content-scaling=fixed&page-id=41%3A2&starting-point-node-id=55%3A68)

## Demo Video

## Project Report
[TaniWise Project Report](https://github.com/fan-key/BorneoHack/blob/0a7b025df21265eab62e7d00d63ad2c7c03e0ebc/TaniWise%20Project%20Report.pdf)
