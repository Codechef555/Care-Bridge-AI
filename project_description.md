# CareBridge AI — Project Description

**CareBridge AI: Rural Healthcare Assistant & Navigation Agent** is a multi-agent AI-driven web application designed to bridge the healthcare accessibility gap in remote, underserved, and rural communities. By resolving critical barriers such as language diversity, low literacy levels, and poor internet connectivity, CareBridge AI serves as a localized, digital companion for rural residents and local community health workers (like ASHA workers).

---

## 🔴 The Problem

Rural healthcare navigation faces several systemic failures:
1.  **Information Asymmetry**: Rural families are often unaware of high-value government health coverages (like the ₹5 Lakh Ayushman Bharat scheme) or safe maternal delivery benefits (like JSY).
2.  **Infrastructure Bottlenecks**: Unstable 2G/3G connections prevent standard graphical platforms or latency-heavy cloud apps from loading.
3.  **Literacy & Language Barriers**: Technical medical text is unreadable for low-literacy users, and most solutions lack native regional language voice readouts.
4.  **Triage Deficits**: The lack of immediate, offline first-aid guidelines for incidents like venomous snake bites, heatstroke, or bleeding often leads to preventable complications before the patient reaches a hospital.

---

## 🟢 The Solution: CareBridge AI

CareBridge AI acts as an intelligent routing station, distributing queries between specialized agents while presenting a premium, highly accessible interface.

### 1. Multi-Agent Intelligent Routing Engine
*   **The CareBridge Dispatcher**: An NLP agent that parses natural language inputs (or voice transcriptions), extracts keywords, logs its reasoning trail, and forwards the message to specialized agents.
*   **Symptom Assessment Agent**: Guides patients through basic symptoms checks (duration, chills, additional signs), provides basic self-care, and renders a prominent disclaimer pointing to local clinics.
*   **Emergency Triage Agent**: Instantly triggered by critical terms (chest pain, snake bites, stroke). It triggers a **Red Alert Layout** in the workspace and displays direct call buttons for local block ambulances.
*   **Healthcare Navigation Agent**: Links queries for clinics, vaccines, or generic drugs to a local directory, showing distances and servicing capabilities.
*   **Scheme Eligibility Agent**: Analyzes user financial queries and prompts them to calculate their eligibility for state schemes.

---

## 🛠️ Key Product Features

### 🌐 Universal Accessibility Suite (UI/UX)
*   **Multilingual Localization**: Fully translated interface and voice engine supporting **English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Spanish (Español)**.
*   **Web Speech Integration**: Click-to-speak voice recognition (Speech-to-Text) for symptom descriptions and automated voice readout (Text-to-Speech) for low-literacy guidance.
*   **Visual Controls**: Slider font scaling (A-, A, A+ sizes) and a high-contrast theme optimized for reading under direct sunlight.
*   **Ultra-Low Bandwidth Mode**: Toggles off heavy graphics, fonts, animations, and image resources for lightning-fast speeds on rural 2G connections.

### 🗺️ Interactive Workspaces
*   **2D Clinic Map Canvas**: Plots nearby Primary Health Centres (PHC), Community Health Centres (CHC), and Generic Pharmacies (Jan Aushadhi) as interactive pins, with one-click direct dialing and routing alerts.
*   **Scheme Eligibility Calculator**: Form-based eligibility check matching family income, category, and age to government health programs (PM-JAY, JSY, RBSK), outputting a checklists of required documents (e.g. Aadhaar/Ration Card).
*   **Offline First Aid Guides**: Step-by-step illustrations for snake bites, heat exhaustion, choking, bleeding, and CPR, emphasizing safety warnings (e.g. "Do NOT apply a tight tourniquet for snake bites").
*   **Vitals Tracker (Chronic Care)**: Allows users to log Blood Pressure, Blood Sugar, and Pulse Rate, categorizing entries into color-coded zones (Normal/Caution/Danger) and offering a CSV export for their doctor.
*   **ASHA Worker Hub**: A specialized management dashboard for local health activists to track pregnancies, child vaccine schedules, register new villagers, and checklist village health campaigns.

---

## ⚙️ Technical Architecture
*   **Frontend**: React 18, TypeScript, Vite.
*   **Styling**: Structured Vanilla CSS (highly optimized custom properties for rapid rendering).
*   **Icons**: Lucide React.
*   **Local State Management**: Mock databases utilizing client-side memory caching, allowing offline-ready load times.
*   **Deployment Pipeline**: Dockerized multi-stage container running a lightweight Nginx Nginx Alpine server on Google Cloud Run port 8080.
