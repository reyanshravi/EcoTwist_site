import mongoose, { Schema } from "mongoose";

// Brand Schema
const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
        maxlength: [50, 'Brand name cannot exceed 50 characters'],
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    logo: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    website: {
        type: String,
        trim: true,
        match: [/^https?:\/\/\S+$/, 'Please enter a valid URL'],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

brandSchema.index({ name: 'text', slug: 1 }); // Text search and slug index

export default mongoose.model("Brand", brandSchema)