import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import razorpay from "./utils/razorpay.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

//  Payment route
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
