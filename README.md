# AutoPilot Careers

Your personal AI-powered agent for automating the job search and application process. Stop wasting time on repetitive tasks and let AutoPilot Careers find and apply to the best jobs for you.

## Overview

AutoPilot Careers is a full-stack SaaS application designed to streamline and accelerate the job search for professionals. It combines a user-friendly dashboard with powerful AI tools to manage profiles, track applications, and optimize application materials. The core vision is to pair this web platform with a browser extension that fully automates the job application process from start to finish.

This repository contains the Next.js web application that serves as the central hub for the user.

## Core Features

- **User Profile Management**: A comprehensive user profile to store all necessary information for job applications, including personal details, professional experience, skills, and social links (LinkedIn, GitHub).
- **Job Application Tracking**: A complete system to manually log and track the status of every job application. View all applications in a centralized dashboard, with details like company, platform, date applied, and current status (Applied, Interviewing, Offer, Rejected).
- **Subscription Tiers**: A built-in pricing page with different subscription plans (Free, Pro). User plan selection is saved to their profile, allowing for future feature-gating.
- **AI-Powered Resume Optimizer**: Analyze a job description against your resume and receive AI-generated suggestions to improve keywords, phrasing, and increase your match score.
- **AI-Powered Cover Letter Tailor**: Automatically generate a tailored cover letter for a specific job by providing a job description, your resume, and a base cover letter template.
- **Automated Application Backend**: A secure Genkit flow (`applyToJob`) serves as the "API" endpoint for a browser extension. It orchestrates the AI tools to prepare all materials needed for an application.
- **Settings & Preferences**: Configure job search preferences (keywords, location) and application settings. The UI is ready to connect with a browser extension.
- **Secure Authentication**: Robust user authentication system using Firebase, supporting both email/password and Google Sign-In.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**:
    - [React](https://react.dev/)
    - [shadcn/ui](https://ui.shadcn.com/): Beautifully designed, accessible components.
    - [Tailwind CSS](https://tailwindcss.com/): For styling and layout.
    - [Lucide React](https://lucide.dev/): For icons.
- **AI & Backend**:
    - [Genkit](https://firebase.google.com/docs/genkit): The AI framework used to create and manage backend flows.
    - [Google Gemini](https://ai.google.dev/): The generative model powering the AI features.
- **Database**: [Google Firestore](https://firebase.google.com/docs/firestore): A NoSQL database for storing user profiles and job applications.
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth): Handles secure user login and session management.
- **Forms**:
    - [React Hook Form](https://react-hook-form.com/): For performant and flexible form state management.
    - [Zod](https://zod.dev/): For schema validation.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root of your project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_ai_api_key
    ```
    You can obtain a key from [Google AI Studio](https://aistudio.google.com/app/apikey).


### Running the Development Server

You need to run two separate processes for the full application to work.

1.  **Run the Next.js Web App:**
    This starts the frontend and the main server.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

2.  **Run the Genkit Developer UI:**
    This allows you to inspect, test, and debug your AI flows separately.
    ```bash
    npm run genkit:watch
    ```
    The Genkit UI will be available at `http://localhost:4000`.

## Deployment

This application is configured for seamless deployment on **Firebase App Hosting**. It is the recommended platform due to its native integration with Firebase services (Auth, Firestore) and Genkit.

The `apphosting.yaml` file is already present and configured. To deploy, you would typically use the Firebase CLI.

```bash
# First, build the application for production
npm run build

# Then, deploy using the Firebase CLI (requires setup)
firebase apphosting:backends:deploy
```
