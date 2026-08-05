# FlexTend Physical Therapy Clinic

A website for **FlexTend Physical Therapy Clinic** located in Lipa City, Batangas, Philippines.

## About

FlexTend is an evidence-based physical and occupational therapy clinic staffed by licensed clinicians. This site provides information about services, booking, and contact details.

## Contact

- **Phone:** +63-967-195-6863
- **Email:** flextendtherapy2024@gmail.com
- **Address:** 299 San Jose Subdivision, Balagbag, Brgy. San Sebastian, Lipa City, Batangas 4217

## Hours

Monday – Saturday: 8:00 AM – 4:00 PM

## Project Structure

```
flextend/
├── FLEXTEND REVISED 2.html   # Main website file
├── .gitignore
└── README.md
```

## Getting Started

Open `FLEXTEND REVISED 2.html` in any modern web browser to view the site locally.

## Mock Admin Account (Development Only)

Use this test account only with the connected Supabase development project:

- **Email:** `mock.admin@flextend.clinic`
- **Temporary password:** `FlextendMock!47Violet-2026`
- **Required profile role:** `admin`

Create the user in Supabase Dashboard under **Authentication → Users**, enable
**Auto Confirm User**, then set the matching profile role to `admin` in
`public.profiles`. If signup is rate-limited, create the user from the
Dashboard instead. The current development project has this account
provisioned with the `admin` role.

Do not use this account in production or reuse its password for any real user.
