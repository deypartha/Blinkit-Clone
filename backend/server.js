import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import razorpay from "./utils/razorpay.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ✅ Connect MongoDB (single connection)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// ✅ Payment route
app.post("/api/payment", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount, // already in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.use("/api/auth", authRoutes);

// ✅ Question Schema & Model
const questionSchema = new mongoose.Schema({
  message: { type: String, required: true, maxlength: 400 },
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);

// ✅ Save question API
app.post("/api/questions", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const newQ = new Question({ message });
    await newQ.save();

    res.json({ success: true, data: newQ });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all questions API
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
