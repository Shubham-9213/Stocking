📌 Stocking – Zerodha Clone

A simple stock trading clone built with MERN Stack (MongoDB, Express, React, Node.js).
Supports authentication, holdings, positions, and order management.

⚙️ Features

🔑 User Signup & Login (with JWT authentication)

📊 View Holdings & Positions

💸 Place Buy & Sell Orders

🔐 Password hashing with bcryptjs

🌐 Backend API built with Express & MongoDB

🎨 Frontend built with React.js

🛠️ Tech Stack

Frontend: React.js (dashboard, frontend folders)

Backend: Node.js, Express.js, Mongoose

Database: MongoDB Atlas

Authentication: JWT + bcryptjs


🚀 Getting Started
1. Clone the repository
git clone https://github.com/Shubham-9213/Stocking.git
cd Stocking

2. Backend Setup
cd backend
npm install


Create a .env file inside backend/:

MONGO_URL=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=5000


Start the backend:

npm start

3. Frontend (Dashboard) Setup
cd dashboard
npm install
npm start




📡 API Endpoints

POST /signup → Create new user

POST /login → Login & get token

GET /verify → Verify JWT token

GET /allholding → Get all holdings

GET /allposition → Get all positions

GET /orders → Get all orders

POST /newOrder → Place buy/sell order

✅ Future Improvements

Add live stock price API

Add each and every stock chart

Deploy frontend + backend together

👨‍💻 Author

Developed by Shubham Singh Bhandari ✨
