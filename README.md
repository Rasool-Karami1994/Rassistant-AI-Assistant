# Rassistant – AI Assistant for Advertisement Platforms

**Rassistant** is a fully responsive, mobile-first web application built with modern frontend technologies including **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It integrates with popular advertisement platforms such as **Divar** and **Sheypoor**, offering an **AI-powered assistant** that can answer user questions about products listed by ad owners.

The project is optimized for mobile use and leverages Docker for simplified deployment and local development.

---

## Features

* **React + Vite:** Modern frontend stack with lightning-fast development and optimized builds.
* **TypeScript:** Provides static typing for a better developer experience and fewer bugs.
* **TanStack Router:** Type-safe, efficient routing system built for React apps.
* **TanStack Query:** Handles data fetching, caching, and synchronization with ease.
* **Tailwind CSS:** Utility-first CSS for rapid UI development and full responsive support.
* **Mobile-First Design:** The UI is designed primarily for mobile users and adapts smoothly to larger screens.
* **AI Assistant:** Automatically understands and answers user queries related to advertisements using smart AI integration.
* **Docker Support:** Easily run the entire application using Docker without installing Node.js locally.

---

## Getting Started

### Prerequisites

* Node.js (v18 or later) OR Docker
* pnpm, npm, or yarn

### Installation (Local)

1. Clone the repository:

   ```bash
   git clone https://github.com/Rasool-Karami1994/Rassistant-AI-Assistant.git
   ```

2. Change into the project directory:

   ```bash
   cd Rassistant-AI-Assistant
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

   or

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

   or

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. Open your browser at [http://localhost:3000](http://localhost:3000)

---

### Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t rassistant-app .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:3000 rassistant-app
   ```

3. Visit the application at [http://localhost:3000](http://localhost:3000)

---

## Deployment

This project is production-ready and can be deployed on platforms like **Vercel**, **Netlify**, or containerized environments like **Docker Swarm**, **Kubernetes**, or **Render**.

---

## Additional Information

* **Smart Caching & Fetching:** Uses TanStack Query for optimized data management.
* **Modular & Typed Routing:** Powered by TanStack Router with full TypeScript support.
* **Containerized:** Easily portable and reproducible thanks to Docker.
* **Mobile UX First:** Designed for a seamless mobile experience first, then scales up.

---

## **Demo:** [https://rassistant-ai-assistant.vercel.app](https://rassistant-ai-assistant.vercel.app)

---
