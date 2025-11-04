# Task Manager Project

Simple drag and drop task manager with backend and frontend.

## What it does

- Create, edit, delete tasks
- Drag tasks between columns (todo, in progress, done)
- Data saves to postgres database
- Frontend made with react and backend with express

## Tech stack

Backend:
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon DB)

Frontend:
- React + TypeScript
- Vite
- Tailwind CSS
- dnd-kit for drag drop
- Axios for api calls

## Setup instructions

### Backend setup

1. Go to backend folder
```
cd backend
```

2. Install packages
```
npm install
```

3. Create .env file in backend folder
```
touch .env
```

4. Add your database url in .env file
```
DATABASE_URL="your_postgresql_database_url_here"
```

You need a postgresql database. You can use:
- Neon (free tier available at neon.tech)
- Supabase (free tier at supabase.com)
- Local postgres installation
- Any other postgres hosting

Example .env file:
```
DATABASE_URL="postgresql://username:password@host:5432/dbname?sslmode=require"
```

5. Generate prisma client
```
npx prisma generate
```

6. Push schema to database
```
npx prisma db push
```

7. Seed database with sample tasks
```
npx ts-node prisma/seed.ts
```

8. Start backend server
```
npm run dev
```

Backend runs on http://localhost:3000

### Frontend setup

1. Open new terminal and go to frontend folder
```
cd frontend
```

2. Install packages
```
npm install
```

3. Start frontend
```
npm run dev
```

Frontend runs on http://localhost:5173

## Using the app

- Backend must be running first
- Then start frontend
- Open browser to http://localhost:5173
- Add new task with the green button
- Drag tasks between columns to change status
- Click edit icon to edit task
- Click delete icon to delete task

## Database

Uses PostgreSQL database. You need to setup your own database and add connection string in backend/.env file.

The .env file is not included in git for security reasons. Create it manually with:
```
DATABASE_URL="your_database_connection_string"
```

To view database use prisma studio:
```
cd backend
npx prisma studio
```

## Project structure

```
TaskManager/
  backend/
    src/
      controllers/
      repositories/
      routes/
      services/
      types/
      database/
    prisma/
      schema.prisma
      seed.ts
  frontend/
    src/
      components/
      services/
      types/
```

## API endpoints

- GET /api/tasks - get all tasks
- GET /api/tasks/:id - get single task
- POST /api/tasks - create new task
- PUT /api/tasks/:id - update task
- DELETE /api/tasks/:id - delete task
