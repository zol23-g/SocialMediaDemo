# 🌐 Social Media Demo App – Full Stack

A complete **GraphQL-powered Social Media App** built with:

- 📲 **React Native + Expo** for the mobile frontend
- 🧠 **Node.js + Apollo Server + Prisma + PostgreSQL** for the backend

Supports user authentication, media upload, likes, comments (with replies), and ratings.

---

## 🧩 Stack Overview

| Layer     | Tech                                     |
|-----------|------------------------------------------|
| Frontend  | React Native, Expo, Apollo Client        |
| Backend   | Node.js, Apollo Server, Express          |
| Database  | PostgreSQL, Prisma ORM                   |
| Auth      | JWT, AsyncStorage                        |
| Uploads   | `graphql-upload`                         |

---

## 📁 Project Structure

```
/
├── backend/               # Node.js GraphQL API
│   ├── src/
│   │   ├── modules/       # Domain modules (user, post, comment, etc.)
│   │   ├── schema/        # GraphQL schema merging
│   │   └── app.ts         # App entry
│   └── .env               # DB & JWT secrets
├── frontend/              # Expo React Native app
│   ├── app/               # Screens & tabs
│   ├── components/        # UI & forms
│   ├── graphql/           # Queries & mutations
│   └── .env               # API base URL
```

