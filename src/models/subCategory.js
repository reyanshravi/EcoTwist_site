import mongoose from "mongoose";

// SubCategory Schema
const subCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Subcategory name is required'],
        trim: true,
        maxlength: [50, 'Subcategory name cannot exceed 50 characters'],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Parent category is required'],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
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

subCategorySchema.index({ name: 'text', category: 1 }); // Index for search and category filtering

export default mongoose.model('SubCategory', subCategorySchema)