// import mongoose, { Schema } from 'mongoose';

// // User Schema
// const userSchema = new Schema({
//     firstName: {
//         type: String,
//         required: [true, 'First name is required'],
//         trim: true,
//         maxlength: [50, 'First name cannot exceed 50 characters'],
//     },
//     lastName: {
//         type: String,
//         trim: true,
//         maxlength: [50, 'Last name cannot exceed 50 characters'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         trim: true,
//         lowercase: true,
//         match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [8, 'Password must be at least 8 characters'],
//     },
//     role: {
//         type: String,
//         enum: ['customer', 'admin', 'vendor'],
//         default: 'customer',
//     },
//     address: [{
//         street: { type: String, trim: true },
//         city: { type: String, trim: true },
//         state: { type: String, trim: true },
//         country: { type: String, trim: true },
//         postalCode: { type: String, trim: true },
//         isDefault: { type: Boolean, default: false },
//     }],
//     phone: {
//         type: String,
//         trim: true,
//         match: [/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number'],
//     },
//     wishlist: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//     }],
//     cart: [{
//         product: { type: Schema.Types.ObjectId, ref: 'Product' },
//         variant: { type: Schema.Types.ObjectId },
//         quantity: { type: Number, min: [1, 'Quantity must be at least 1'] },
//     }],
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         index: true,
//     },
// }, { timestamps: true });

// userSchema.index({ email: 1 });

// export default mongoose.models.userSchema || mongoose.model('User', userSchema)


// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  mfaSecret: {
    type: String,
    select: false,
  },
  mfaEnabled: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

/**
 * Hash the password before saving
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Compare provided password with stored hash
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Avoid model overwrite issue in development
const User = models.User || model('User', UserSchema);

export default User;
