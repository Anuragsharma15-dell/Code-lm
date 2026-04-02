
# Code-lm
 
> The AI-powered collaborative code editor. High-performance, obsidian-grade development experience for modern teams.
 
![Code-lm Landing Page](new.png)
 
---
 
## Features
 
- **Real-time Collaboration** — Conflict-free multiplayer editing with sub-50ms sync. See every cursor and every change, live.
- **AI Code Completion** — Context-aware suggestions that understand your whole codebase, not just the current file.
- **Smart Refactoring** — One-click structural improvements. Rename, extract, and restructure while preserving semantics.
- **Built-in Terminal** — Full PTY terminal with command history, autocomplete, and direct code execution.
- **Secure by Default** — E2E encrypted sessions, role-based access, and audit logs for every change.
- **Deep Integrations** — GitHub, GitLab, Vercel and more. Push, deploy, and review without leaving the editor.
 
---
 
## Tech Stack
 
| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Editor | Monaco Editor |
| Realtime Sync | Yjs + y-socket.io |
| Terminal | xterm.js + node-pty |
| Backend | Node.js, Express |
| Auth | JWT middleware |
 
---
 
## Getting Started
 
### Prerequisites
 
- Node.js 18+
- npm or yarn
 
### Installation
 
```bash
# Clone the repo
git clone https://github.com/your-username/code-lm.git
cd code-lm
 
# Install dependencies for both frontend and backend
cd frontend && npm install
cd ../backend && npm install
```
 
### Running Locally
 
```bash
# Start the backend (port 3000)
cd backend
npm run dev
 
# Start the frontend (port 5173)
cd frontend
npm run dev
```
 
Open [http://localhost:5173](http://localhost:5173) in your browser.
 
---
 
## Project Structure
 
```
code-lm/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.tsx       # Landing page
│   │   │   └── Editor.tsx        # Collaborative editor
│   │   └── main.tsx
│   └── package.json
└── backend/
    └── src/
        ├── app.ts                # Express server + Socket.IO
        ├── terminal.ts           # PTY WebSocket handler
        ├── routes/
        │   └── authroute.ts
        ├── controller/
        │   └── editorcontroller.ts
        └── middleware/
            └── authmiddleware.ts
```
 
---
 
## Environment Variables
 
Create a `.env` file in the `backend/` directory:
 
```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
```
 
---
 
## Contributing
 
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request
 
---
 
## License
 
MIT © 2026 Code-lm
 
