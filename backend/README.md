
---
# 📸 Social Media Backend API

A full-featured social media backend API built with:

- **Node.js** + **TypeScript**
- **Apollo GraphQL**
- **Prisma ORM**
- **MySQL**
- **JWT Authentication**
- **Role-Based Access Control (RBAC)**
- **Modular service architecture**

---

## 🚀 Features

- User registration, login, and profile management
- Post creation with captions and media uploads
- Comment system with nested replies
- Like/Unlike functionality
- 1–5 star rating system for posts
- Role-based access (Admin & User)
- Global error handling
- Clean and scalable service-based architecture

---

## 🛠 Tech Stack

- **Backend**: Node.js, TypeScript  
- **API**: Apollo GraphQL  
- **ORM**: Prisma  
- **Database**: MySQL  
- **Authentication**: JWT  
- **Testing**: Jest *(optional setup)*

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/zol23-g/Social_Media_Backend.git
cd social-media-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="mysql://user:password@localhost:3306/socialmedia"
JWT_SECRET="your-jwt-secret"
```

### 4. Apply database migration

```bash
npx prisma migrate dev --name init
```

### 5. Start the development server

```bash
npm run dev
```

### 6. API Playground

Visit [http://localhost:4000](http://localhost:4000) to explore the GraphQL Playground.

---

Made with ❤️ by [Zelalem](https://github.com/zol23-g)

