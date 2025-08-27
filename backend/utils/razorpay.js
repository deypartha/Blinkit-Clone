import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); // load here too (safe if utils is loaded separately)

console.log("Loaded Razorpay Key:", process.env.RAZORPAY_KEY_ID); // debug log

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export default razorpay;
