const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(express.json());

// ✅ CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// ✅ ROUTES
app.use("/api/auth", authRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ PROTECTED ROUTE
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your profile 🔐",
    userId: req.user.id
  });
});

// ✅ START SERVER (ALWAYS LAST)
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});