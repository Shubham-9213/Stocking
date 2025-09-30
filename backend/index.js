require("dotenv").config();  // load .env

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Holdingmodel } = require("./model/Holding");
const { Positionmodel } = require("./model/Position");
const { Ordermodel } = require("./model/Order");

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Signup (with auto login)
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // 🔑 generate token on signup (auto login)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret123", {
      expiresIn: "1h",
    });

    res.json({
      message: "Signup successful",
      token,
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "1h",
  });
https://github.com/Shubham-9213
  res.json({ message: "Login successful", token });
});

// ✅ Verify token
app.get("/verify", (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    res.json({ status: "ok", user: decoded });
  } catch (err) {
    res.status(401).json({ status: "error", message: "Invalid token" });
  }
});

// ✅ Holdings
app.get("/allholding", async (req, res) => {
  const allholding = await Holdingmodel.find({});
  res.json(allholding);
});

// ✅ Positions
app.get("/allposition", async (req, res) => {
  const allposition = await Positionmodel.find({});
  res.json(allposition);
});

// ✅ Get all orders
app.get("/orders", async (req, res) => {
  const orders = await Ordermodel.find().sort({ _id: -1 }); // latest first
  res.json(orders);
});

// ✅ Place new order (Orders + Holdings update)
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // Save in Orders
    const order = new Ordermodel({ name, qty, price, mode });
    await order.save();

    // BUY Logic
    if (mode === "BUY") {
      let holding = await Holdingmodel.findOne({ name });

      if (holding) {
        // Update avg price
        let totalQty = holding.qty + Number(qty);
        let totalCost =
          holding.avg * holding.qty + Number(price) * Number(qty);
        holding.avg = totalCost / totalQty;
        holding.qty = totalQty;
        holding.price = Number(price);
      } else {
        holding = new Holdingmodel({
          name,
          qty: Number(qty),
          avg: Number(price),
          price: Number(price),
          net: "+0.0",
          day: "+0.0",
        });
      }
      await holding.save();
    }

    // SELL Logic
    if (mode === "SELL") {
      let holding = await Holdingmodel.findOne({ name });
      if (!holding) {
        return res.status(400).json({ message: "You don't own this stock!" });
      }

      holding.qty = holding.qty - Number(qty);
      if (holding.qty <= 0) {
        await Holdingmodel.deleteOne({ name });
      } else {
        holding.price = Number(price);
        await holding.save();
      }
    }

    res.json({ message: "Order placed successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Start server
app.listen(process.env.PORT || 5000, () => {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Server running & DB connected ✅");
});
