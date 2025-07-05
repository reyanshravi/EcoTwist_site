import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Review comment cannot exceed 500 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const variantSchema = new Schema({
  size: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
  },
  sku: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  image: {
    type: String,
    trim: true,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
    index: true, // For search optimization
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // For SEO-friendly URLs
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
    index: true, // For filtering by category
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    index: true,
  },
  images: [{
    type: String,
    trim: true,
  }],
  material: {
    type: String,
    trim: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    index: true,
  },
  ecoScore: {
    type: Number,
    min: [0, 'Eco score cannot be less than 0'],
    max: [10, 'Eco score cannot be more than 10'],
    default: 5,
  },
  averageRating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0,
  },
  reviews: [reviewSchema],
  variants: [variantSchema],
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 },
    unit: { type: String, enum: ['cm', 'in', 'm'], default: 'cm' },
  },
  weight: {
    value: { type: Number, min: 0 },
    unit: { type: String, enum: ['g', 'kg', 'lb', 'oz'], default: 'kg' },
  },
  features: [{
    name: { type: String, trim: true },
    value: { type: String, trim: true },
  }],
  shipping: {
    isFree: { type: Boolean, default: false },
    estimatedDays: { type: Number, min: 0 },
    regions: [{ type: String, trim: true }],
  },
  tags: [{
    type: String,
    trim: true,
    index: true, // For tag-based searches
  }],
  seo: {
    metaTitle: { type: String, trim: true, maxlength: [60, 'Meta title cannot exceed 60 characters'] },
    metaDescription: { type: String, trim: true, maxlength: [160, 'Meta description cannot exceed 160 characters'] },
    keywords: [{ type: String, trim: true }],
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true, // For featured product queries
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // For sorting by creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt
});

// Indexes for common queries
productSchema.index({ name: 'text', description: 'text', 'seo.keywords': 'text' }); // Text search index
productSchema.index({ price: 1, averageRating: -1 }); // For sorting by price and rating

export default mongoose.models.Product || mongoose.model('Product', productSchema);