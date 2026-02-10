# Kala Quest
Kala Quest is an interactive web platform where users explore Indian heritage through story-based quests, culture-inspired games, and direct engagement with artisans, while supporting traditional crafts through a built-in marketplace and opportunities system.

## LIVE DEMO LINK
🔗 Live Demo: https://kalaquest.vercel.app

## Features
- Mystery-driven quests with collectible clues
- Artisan profiles and product storytelling
- Personalized recommendations powered by AI
- Secure marketplace flow
- Heritage ledger for product history

## Platform Flow
Login → Dashboard → Featured Crafts → Story Quest → Interactive Play → Cultural Exploration → Artisan Profiles → Marketplace → Opportunities

## 📸 Screenshots
### Home Page
![Home Page](screenshots/home.png)

### Play with Heritage
![Play with Heritage](screenshots/play-with-heritage.png)

### Featured Crafts
![Featured Crafts](screenshots/featured-crafts.png)

### Quest Experience
![Quest Experience](screenshots/quest.png)

## What Kala Quest Does (At a Glance)
Opens with a personalized dashboard featuring curated crafts and active learning quests

Teaches art forms (e.g., Persian glaze pottery) through short narrative stories + interactive questions

Converts cultural learning into playable experiences like pottery simulations, puzzles, mandala coloring, and heritage crosswords

Lets users explore India state by state through focused cultural stories

Connects users directly with artisans via profiles, products, and commissions

Supports artisan livelihoods through marketplace purchases and work opportunities

## Tech Stack
- Next.js 15, React 19, TypeScript
- Tailwind CSS, Radix UI, shadcn/ui-style components
- Firebase (Auth + Firestore)
- Genkit + Google GenAI (optional AI features)

## Getting Started
1. Install dependencies:
```bash
npm install
```
2. Start the dev server:
```bash
npm run dev
```
The app runs on `http://localhost:9002`.

## Scripts
- `npm run dev` - start Next.js with Turbopack on port 9002
- `npm run build` - production build
- `npm run start` - run the production server
- `npm run lint` - Next.js lint
- `npm run typecheck` - TypeScript checks
- `npm run genkit:dev` - start Genkit dev server
- `npm run genkit:watch` - start Genkit dev server in watch mode

## Environment
If you add secrets or API keys, create a `.env.local` file.  
AI features may require Google GenAI credentials; configure them according to your Genkit setup (commonly `GOOGLE_API_KEY`).

## Project Structure
- `src/app` - Next.js App Router pages
- `src/components` - shared UI components
- `src/firebase` - Firebase configuration and helpers
- `src/ai` - Genkit setup
- `docs` - product blueprint and backend notes


