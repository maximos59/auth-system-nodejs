# 🔐 Auth System API (Node.js)

## 📌 Description
A secure authentication system built with Node.js, Express, and MongoDB.

## 🚀 Features
- User registration
- Secure password hashing (bcrypt)
- Login with JWT authentication
- Protected routes
- Clean MVC structure

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- Bcrypt

## 📂 Project Structure
- controllers/
- routes/
- middleware/
- models/

## 🔑 API Endpoints

### Register
POST /api/auth/register

### Login
POST /api/auth/login

### Profile (Protected)
GET /api/profile

## ⚙️ Setup

1. Clone repo
2. Install dependencies:
npm install

3. Create .env file:
MONGO_URI=your_mongodb_uri  
JWT_SECRET=your_secret  
PORT=5000  

4. Run:
node server.js

## 👨‍💻 Author
maximos59