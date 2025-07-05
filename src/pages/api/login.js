import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { rateLimit } from 'express-rate-limit';
import { MongoClient } from 'mongodb';

// MongoDB connection setup
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';
const MONGODB_DB = process.env.MONGODB_DB || 'your-database-name';
const client = new MongoClient(MONGODB_URI);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 login attempts per IP
  message: 'Too many login attempts, please try again later',
});

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth_token';
const TOKEN_EXPIRY = 60 * 60 * 24; // 1 day in seconds
const SALT_ROUNDS = 10;

// Input validation function
const validateInput = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !password) {
    return 'Email and password are required';
  }
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
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

    const { email, password } = req.body;

    // Validate input
    const validationError = validateInput(email, password);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');

    // Check if user exists
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    if (!user) {
      await client.close();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      await client.close();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

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
    return res.status(200).json({
      message: 'Login successful',
      user: { email: user.email },
    });

  } catch (error) {
    console.error('Login error:', error);
    await client.close();
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Middleware to verify JWT for protected routes
export const verifyToken = async (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Verify user still exists in MongoDB
    await client.connect();
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email: decoded.email });
    
    if (!user) {
      await client.close();
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = decoded;
    await client.close();
    next();
  } catch (error) {
    await client.close();
    return res.status(401).json({ error: 'Invalid token' });
  }
};