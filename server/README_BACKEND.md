Backend README
----------------

This project includes a lightweight Node/Express backend that replaces the previous serverless `/api/quiz` route.

Environment variables
- `SUPABASE_URL` - your Supabase project URL
- `SUPABASE_API_KEY` - your Supabase service or anon key
- `PORT` - optional, defaults to `4000`

Running the backend locally

1. Install dependencies (from project root):

```bash
npm install
```

2. Create a `.env` file in the project root with the required variables above.

3. Start the server:

```bash
npm run start:server
```

Frontend configuration
-- To make the frontend call the backend during development, set the Vite environment variable `VITE_API_URL` to the backend base URL (no trailing slash). For example:

```bash
# .env (project root)
VITE_API_URL=http://localhost:4000
SUPABASE_URL=...
SUPABASE_API_KEY=...
```

The frontend component `ProstatePahQuiz` will use `VITE_API_URL` if present; otherwise it will fallback to `/api/quiz`.
