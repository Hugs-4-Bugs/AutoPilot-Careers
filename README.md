# AutoPilot Careers

This is a Next.js application for AutoPilot Careers, a job-application automation platform.

## Overview

AutoPilot Careers helps users automate their job search and application process. Users can manage their profile, upload resumes, define job search criteria, and leverage AI tools to tailor their applications.

This repository contains the frontend web application built with Next.js and shadcn/ui.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: React, Tailwind CSS, shadcn/ui
- **AI**: Genkit with Google Gemini
- **Forms**: React Hook Form, Zod

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

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the Next.js development server, typically on `http://localhost:9002`.

The Genkit flows are also available and can be tested via the Genkit developer UI. To run it, use:
```bash
npm run genkit:watch
```
This will start the Genkit development server, typically on `http://localhost:4000`.

## Project Structure

- `src/app/`: Contains all the routes and pages for the application.
  - `(auth)/`: Auth-related pages (Login, Signup).
  - `dashboard/`: Protected routes for the user dashboard.
  - `page.tsx`: The main landing page.
- `src/components/`: Reusable React components.
  - `ui/`: Components from shadcn/ui.
  - `dashboard/`: Components specific to the dashboard.
  - `landing/`: Components for the marketing/landing page.
- `src/ai/`: Contains Genkit flows for AI features.
- `src/lib/`: Utility functions and shared libraries.
- `public/`: Static assets.
