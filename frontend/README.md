# 📱 Social Media App – Frontend (React Native)

This is the mobile frontend for the Social Media App built using **React Native + Expo + Apollo Client**. It connects to a GraphQL backend and supports user authentication, posting, liking, commenting, and rating features.

---

## ⚙️ Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [Formik + Yup](https://formik.org/)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
# Create a .env file in root with:
GRAPHQL_URI=http://<your-backend-host>:4000/graphql

# 3. Start the app
npx expo start
```

---

## 📁 Project Structure

```
app/
├── (auth)/         → Login & Signup screens
├── (app)/          → Feed, Create, Profile screens
├── comments/       → Comments with nested replies
components/         → Reusable UI and screen components
graphql/            → Queries & Mutations
hooks/              → Custom hooks (auth, image picker)
utils/              → Helper functions (media url, etc.)
apollo/             → Apollo Client setup
```

---

## ✅ Features

- JWT-based login/signup
- Post creation with media upload
- Like & rate posts (1–5 stars)
- Nested comments & replies
- Auth-protected navigation

---


