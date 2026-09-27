# FitLog

FitLog is a responsive workout library for exploring exercises, planning a daily session, and saving workouts for later. Plan and saved lists are stored in the browser with LocalStorage.

## Getting started

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` starts the development server.
- `npm run lint` checks the project with ESLint.
- `npm run build` creates a production build.
- `npm run start` serves the production build.

## Features

- Browse workout cards and open exercise instructions.
- Add up to five exercises to today's plan.
- Save workouts and sort lists by duration, calories, or rating.
- Store plan and saved workouts in LocalStorage.
- Use the layout on desktop, tablet, and mobile screens.

## Data source

Workout information is loaded from the FitLog REST API. The app tries its configured API endpoints in order if one is unavailable. Plan and saved items remain in the current browser.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, and Sonner.
