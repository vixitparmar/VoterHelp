# 🗳️ VoterHelp: Interactive Election Assistant

A production-ready, interactive web application designed to simplify the complex election process for first-time voters and general citizens. Built with a focus on accessibility, transparency, and engaging UX.

## 🌟 Features

- **Interactive Process Journey**: A 5-step guided walkthrough from registration to results with deep-dive details.
- **Live Election Timeline**: Real-time tracking of election milestones like nominations, polling day, and results.
- **Visual Voting Guide**: A step-by-step onboarding guide for the polling booth experience, including Do's and Don'ts.
- **Searchable FAQ**: Instant answers to common voter queries using a filtered accordion interface.
- **Admin Simulation Hub**: A dedicated dashboard for election officials to update global status and phases dynamically.
- **Learning Progress Tracker**: Gamified experience to encourage users to complete their voter education.
- **Mobile First & Accessible**: Responsive design with focus on high contrast and touchable elements.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 19 (Vite)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router 7

### Architecture
- **Standalone Frontend**: The application runs entirely in the browser with local dummy data, making it easy to deploy as a static site or a single container.

## 📁 Folder Structure

```text
frontend/
 ├── src/
 │   ├── components/  # Reusable UI elements
 │   ├── pages/       # Page-level components
 │   ├── layouts/     # Shared layout (Navbar, Footer)
 │   ├── services/    # Zustand store
 │   ├── data/        # Dummy data for standalone mode
 │   ├── routes/      # React Router configuration
 │   ├── assets/      # Static images and icons
 │   └── App.jsx      # Main application entry
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   ```

2. **Setup & Run**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🐳 Docker Deployment

The project is containerized for easy deployment to Cloud Run or any container registry.

```bash
docker-compose up --build
```

## 🛣️ Future Enhancements
- [ ] **Real API Integration**: Connect to actual Election Commission APIs.
- [ ] **Locate My Booth**: Integrated Maps API to find nearest polling stations.
- [ ] **AI Chatbot**: Advanced LLM-powered assistant for personalized help.

---
Built with ❤️ for democratic empowerment.
