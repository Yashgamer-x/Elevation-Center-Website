# The Elevation Center: membership sign up and sign in

React Router app (SSR) with a working join flow, sign in, and a shared member Excel.

## Run

    npm install
    cp .env.example .env      # then fill in values
    npm run dev               # http://localhost:5173

Production: `npm run build && npm start` (set `SESSION_SECRET`, `STAFF_EMAILS`, and optionally SMTP and `APP_URL`).

## What it does

- `/join`: four steps (tier, details, options and permissions, confirm). Tiers: Ambassador $50, Ambassador Plus $75, Student free (must use a `.edu` email).
- Every sign-up is appended to one Excel file, `data/members.xlsx` (or `MEMBERS_XLSX_PATH`), including free students. Columns: Name, Email, Tier, Type, Paid, Join date, Renewal date (12 months later), School email verified, Consent, Website listing, Options checked, Welcome call, Outcome, Owner, Next-step date. Dropdowns are set on the status columns.
- Passwords are never written to the Excel. Accounts live in `data/accounts.json` (scrypt hashed).
- Students get a verification link by email; clicking it flips "School email verified" to Yes in the Excel. Without `SMTP_HOST` the link is printed in the server log.
- `/signin` and `/account`. The account page reads the live Excel row, so edits by staff (for example Paid) show up for the member.
- `/members.xlsx` downloads the file for emails listed in `STAFF_EMAILS`.
- If the Excel is locked (open in desktop Excel on Windows), the new row is held in `data/pending-members.json` and added on the next write.

## Still to do

- Payment: Ambassador tiers are saved as `Unpaid` until the University approves the payment path. Staff set `Paid` in the Excel.
- Add real Terms and Privacy URLs in `app/lib/config.ts`.
- Forgot password and myCharger single sign-on are not built.
