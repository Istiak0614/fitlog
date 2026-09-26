# 💪 FitLog — Workout Library

FitLog is a responsive workout-library and daily-plan application built with Next.js, TypeScript, Tailwind CSS, React Context, and the FitLog API. Users can browse 12 workouts, open detailed exercise pages, build a five-workout daily plan, save workouts for later, track live metrics, sort/search lists, mark exercises complete, and preserve their plan across reloads.

## 🔗 API

- All workouts: https://api.abcz.workers.dev/api/fitlog
- Single workout: https://api.abcz.workers.dev/api/fitlog/:id

## 🛠️ Technologies

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- React Context API
- react-hot-toast
- lucide-react icons
- localStorage persistence

## ✨ Key Features

1. Responsive workout library with API data and a 3-column desktop grid.
2. Dynamic workout detail pages with specs, instructions, plan and save actions.
3. Shared Context state for Today's Plan, Saved workouts, navbar counters and metrics.
4. Five-workout daily cap, duplicate protection and toast notifications.
5. My Plan tabs with sorting by duration/calories/rating and search by name/tag/equipment.
6. Mark as Done and Remove controls with real-time UI updates.
7. localStorage persistence so Plan and Saved data survive page reloads.
8. Loading states, API error handling, responsive navigation and custom 404 page.

## 🖼️ Logo and Banner

### Logo

`public/images/logo.png`


### Hero banner

`public/images/hero-banner.png`


## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm start
```

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── workout/
│   │   └── [id]/
│   │       └── page.tsx
│   └── my-plan/
│       └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WorkoutCard.tsx
│   ├── LibrarySection.tsx
│   ├── WorkoutDetailsClient.tsx
│   └── Footer.tsx
├── context/
│   └── PlanContext.tsx
├── types/
│   └── index.ts
└── utils/
    └── api.ts
```

## 🌐 Deployment

Recommended: Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Let Vercel detect Next.js automatically.
4. Deploy.
5. Test `/`, `/workout/1`, `/my-plan`, refresh on each route, and an invalid route.

## 📬 Submission

- Live Link: https://fitlog-blond-xi.vercel.app/
- GitHub Repository Link: https://github.com/Istiak0614/fitlog
