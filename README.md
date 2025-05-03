# 🎯 Contest Creation Platform

A full-stack web application that allows users to create and participate in contests by paying a fee. Features include secure authentication, CRUD operations for contests, countdown timers for contest endings, and real-time updates.

## 🔗 Live Site
> [Add your deployed link here]

## 🧰 Tech Stack

### Frontend:
- React
- React Router DOM
- Axios
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js

## ⚙️ Features

- 🔐 **User Authentication**: Secure login and registration with JWT.
- 📝 **CRUD Operations**: Users and admins can create, read, update, and delete contests.
- 💳 **Payment Integration**: Users can pay to join contests. (Use dummy payment or integrate real one like Stripe if applicable)
- ⏰ **Contest Countdown Timer**: Real-time countdown showing how much time is left until the contest ends.
- 📋 **Contest Participation**: Users can view available contests and join by paying.
- 🧑‍💼 **Admin Panel** (Optional): Manage users, contests, and monitor participation.
- 📱 **Responsive Design**: Optimized for desktop and mobile devices.

## 📁 Folder Structure

```bash
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   └── App.jsx

server/
├── controllers/
├── models/
├── routes/
├── middlewares/
└── index.js
