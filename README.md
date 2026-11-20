# SkillRoute – Smart Courses Recommender

Centralised, personalised learning roadmaps for engineering students: roadmap by what you already know, courses and certifications from
Coursera, Google, IBM, Infosys Springboard, Udemy and YouTube only, internships, dashboard and a resume analyzer.
Stack: React + Vite + Tailwind (frontend) and Express (backend, same port).

## Run on your laptop (VS Code)

```
npm install
npm run dev
```
Then open **http://localhost:3000** (not 0.0.0.0). Needs Node.js 20+. Stop with Ctrl + C.

Accounts and progress are saved in `data/db.json` (created automatically).
Password reset: without SMTP settings the 6-digit code is printed in the terminal. To get real e-mails copy `.env.example` to `.env` and fill the SMTP lines.

See **DEPLOYMENT.md** to put the site online.

## How the personalisation works

1. One-time profile (course, specialisation, year/sem, skills, target role) is saved to your account.
2. Domains are ranked by match with your skills, specialisation and role.
3. On a domain you tell how much you know. Topics covered by your skills are ticked automatically; stages below your level are skipped.
4. Courses and certifications (3 to 5) are chosen for the topics you still have to learn, your level and your role. They change as you tick topics.
5. Internships unlock at 70 % of the roadmap and are ranked by your skills.
6. The dashboard combines everything: learning plan, courses in progress / finished, internships applied, time spent and resume score.

## Login rules

* One account per email (Gmail dots and +tags count as the same address). New email -> Sign Up. Existing email -> Log In.
* Password: at least 8 characters with letters and numbers. 5 wrong attempts lock the account for 15 minutes.
* Wrong password / unknown email show clear messages with "Update password" and "Create account" buttons.
