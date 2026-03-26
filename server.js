const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");
const User = require("./models/User"); // 👈 ADD THIS

const app = express();
app.use(express.json());

// ✅ CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

// ✅ ROUTES
app.use("/api/auth", authRoutes);

// ✅ TEST ROUTE (IMPORTANT FOR RAILWAY)
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ PROTECTED ROUTE
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to your profile 🔐",
    userId: req.user.id
  });
});

// ✅ NEW ROUTE: GET CURRENT USER 🔥
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// ✅ FIX PORT FOR RAILWAY
const PORT = process.env.PORT || 5000;

// ✅ START SERVER (ALWAYS LAST)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});