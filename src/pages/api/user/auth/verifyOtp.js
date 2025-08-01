import mongoose from "mongoose";
import User from "@/models/User.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }

    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = null; // Clear OTP
    await user.save();

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    // Prevent multiple connection closures in dev mode
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}
