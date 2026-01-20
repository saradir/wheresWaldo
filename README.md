Where’s Waldo — Photo Tagging Game

This project is based on The Odin Project’s “Where’s Waldo” photo tagging assignment, but with modified requirements and scope.

Instead of recreating the original Where’s Waldo characters and rules, I built a custom photo-tagging game that focuses on the same core technical challenges:

detecting click coordinates relative to an image

validating hits against predefined target regions

handling game timing and completion

storing and displaying scores via a leaderboard

The emphasis of the project is on frontend–backend coordination and reasoning, rather than on visual fidelity or content accuracy.

Key Features

Interactive image with click-based target detection

Server-side validation of hits

Timed game sessions

Leaderboard with ranking logic

Modal and page views for scores

Deployed frontend and backend

Tech Stack

Frontend: React (Vite)

Backend: Node.js, Express

Database: PostgreSQL (via Prisma)

Hosting: Netlify (frontend), Render (backend)

Notes on Deployment

This project is deployed on free hosting tiers.
As a result:

the backend may cold-start after inactivity

in-memory game sessions reset on server restart

These constraints are acceptable for a learning project and are documented intentionally.

Project Context

This project was built as part of The Odin Project curriculum, with deliberate deviations to explore design decisions, tradeoffs, and implementation details beyond the strict assignment specification.
Links:
https://findthisperson.netlify.app
