# 📌 Smart Bookmark – Realtime Cloud Bookmark Manager

A modern, secure, real-time bookmark management application built with **Next.js 16 (App Router)** and **Supabase**.

This application allows users to securely manage personal bookmarks using Google authentication, with real-time synchronization across tabs and devices.

---

## 🚀 Live Demo

> 

---

## 🧱 Tech Stack

### Frontend
- Next.js 16 (App Router + Turbopack)
- React 18
- TypeScript (Strict Mode)
- Tailwind CSS

### Backend / Infrastructure
- Supabase (PostgreSQL)
- Supabase Auth (Google OAuth)
- Supabase Realtime
- Row Level Security (RLS)

---

## ✨ Features

- 🔐 Google OAuth authentication
- 🔒 User-specific private bookmarks (RLS secured)
- ⚡ Realtime updates across multiple tabs
- ➕ Instant add (Optimistic UI)
- ❌ Instant delete (Optimistic UI)
- 🌐 Auto-detect website title
- 🖼 Favicon preview
- 🎨 Modern SaaS-style UI
- 📦 Production-ready build

---

## 🏗 Architecture Overview

```
User → Google OAuth → Supabase Auth
                       ↓
                Supabase PostgreSQL
                       ↓
            Realtime Postgres Changes
                       ↓
                  Next.js UI
```

### Key Principles

- Database-level security using Row Level Security
- State lifting for proper React architecture
- Optimistic UI for immediate feedback
- Strict typing for production safety

---

## 🛠 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd smart-bookmark-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗄 Supabase Database Setup

Create `bookmarks` table:

```sql
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  favicon text,
  created_at timestamp default now()
);
```

Enable RLS:

```sql
alter table bookmarks enable row level security;
```

Policies:

```sql
create policy "Users can view own bookmarks"
on bookmarks
for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on bookmarks
for insert
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on bookmarks
for delete
using (auth.uid() = user_id);
```

---

## ▶ Run Locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

---

# 🔥 Challenges Faced & Solutions

## 1️⃣ Google OAuth Redirect Error

**Problem:** `redirect_uri_mismatch`  
**Cause:** Incorrect callback URL configured in Google Cloud.  
**Solution:** Added correct Supabase callback:

```
https://<project-id>.supabase.co/auth/v1/callback
```

---

## 2️⃣ Row Level Security Blocking Inserts

**Problem:** `new row violates row-level security policy`  
**Cause:** Insert policy missing.  
**Solution:** Added:

```sql
with check (auth.uid() = user_id);
```

---

## 3️⃣ Realtime Not Updating Instantly

**Problem:** UI required manual refresh.  
**Cause:** State managed inside child component.  
**Solution:**
- Lifted state to Dashboard
- Implemented optimistic updates
- Filtered realtime by `user_id`

---

## 4️⃣ TypeScript Production Build Failure

**Problem:** `Parameter 'prev' implicitly has an 'any' type`  
**Cause:** Strict TypeScript enforcement during build.  
**Solution:** Created explicit `Bookmark` interface and typed state properly.

---

## 5️⃣ Schema Cache Error (favicon column)

**Problem:**
```
PGRST204: Could not find 'favicon' column
```

**Cause:** Frontend insert included `favicon` but DB column not created.  
**Solution:**

```sql
alter table bookmarks add column favicon text;
```

---

## 6️⃣ URL Parsing Crash

**Problem:** `Failed to construct 'URL': Invalid URL`  
**Cause:** Users entering URLs without protocol.  
**Solution:**
- Auto-prefixed `https://`
- Wrapped URL parsing in try/catch


---

# 📊 Engineering Decisions

### Why Supabase?
- Built-in Auth
- Built-in Realtime
- PostgreSQL with RLS
- Reduced backend complexity

### Why Optimistic UI?
Improves UX by updating UI instantly without waiting for network confirmation.

### Why RLS?
Security enforced at database layer prevents unauthorized data access.

---

# 🚀 Future Improvements

- Bookmark tagging system
- Search with debouncing
- Drag & drop sorting
- Chrome extension integration
- Export/Import bookmarks
- Framer Motion animations
- Domain grouping

---

# 👨‍💻 Author

Gaddam Soumya 
Software Developer  

