<!-- @format -->

# 🌬️ KuraWind

**KuraWind** is a lightweight, privacy-first messenger built with **React (Vite)** and **Firebase**.  
The goal is to create a chat platform that **stores no data on servers** — Firebase is used **only as a transport layer**, while all chat history is saved locally on each user's device (`localStorage`).

---

## 🚀 Features

- 🔒 **Privacy-first** → messages never stay on Firebase, only on device
- 📨 **Realtime messaging** → powered by Firebase Realtime Database
- 🗑️ **Auto-remove from Firebase** → after delivery, messages are deleted from the server
- 💾 **Local persistence** → chat history is stored in browser `localStorage`
- 👤 **Username system** → simple local username (no signup required)
- 🔔 **Browser notifications** → get notified of new messages
- 📤 **Export/Import** → backup and restore your chat history
- 🌐 **Offline support** → works offline, syncs when reconnected
- 📱 **PWA-ready** → installable as a Progressive Web App
- 🎨 **Modern UI** → beautiful gradient design with responsive layout

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite 7
- **Backend (transport only):** Firebase Realtime Database
- **Styling:** Pure CSS with modern design

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/KuraWind.git
   cd KuraWind
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

---

## 🔧 Progress Checklist

- [x] Project setup with Vite + React
- [x] Firebase configured (`firebase.js`)
- [x] LocalStorage persistence for messages
- [x] Firebase listeners for realtime chat
- [x] Split into `ChatBox` + `InputBox` + `UsernameSetup` components
- [x] Modern CSS styling with gradients and responsive design
- [x] Username system (local only)
- [x] Browser notifications for new messages
- [x] Export/Import chat history functionality
- [x] Connection status indicator
- [x] Offline message support
- [x] PWA manifest for installability
- [x] GitHub Pages deployment workflow
- [x] Auto-scroll to latest messages
- [x] Character count and input validation
- [x] Timestamp formatting with relative times

---

## 📌 Summary

> **KuraWind** is a React (Vite) + Firebase lightweight messenger where Firebase acts only as a temporary transport layer, while chats are kept private on the user's device using localStorage. It's privacy-first, real-time, and installable as a PWA.

---

_Built with ❤️ for privacy-conscious users who want real-time messaging without sacrificing data ownership._
