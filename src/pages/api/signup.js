import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { rateLimit } from 'express-rate-limit';
import { MongoClient } from 'mongodb';

// MongoDB connection setup
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';
const MONGODB_DB = process.env.MONGODB_DB || 'Blog';
const client = new MongoClient(MONGODB_URI);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 signup attempts per IP
  message: 'Too many signup attempts, please try again later',
});

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth_token';
const TOKEN_EXPIRY = 60 * 60 * 24; // 1 day in seconds
const SALT_ROUNDS = 10;

// Input validation function
const validateInput = (email, password, confirmPassword) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !password || !confirmPassword) {
    return 'Email, password, and confirm password are required';
  }
  
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

export default async function handler(req, res) {
  try {
    // Apply rate limiting
    await limiter(req, res, () => {});

    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password, confirmPassword } = req.body;

    // Validate input
    const validationError = validateInput(email, password, confirmPassword);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      await client.close();
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Store user in MongoDB
    const user = {
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    await usersCollection.insertOne(user);

    // Generate JWT
    const token = jwt.sign(
      { email: user.email, timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    // Set secure cookie
    res.setHeader('Set-Cookie', serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: TOKEN_EXPIRY,
    }));

    await client.close();
    return res.status(201).json({
      message: 'Signup successful',
      user: { email: user.email, createdAt: user.createdAt },
    });

  } catch (error) {
    console.error('Signup error:', error);
    await client.close();
    return res.status(500).json({ error: 'Internal server error' });
  }
}