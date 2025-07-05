import mongoose from "mongoose";

// Order Schema
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        variant: { type: Schema.Types.ObjectId },
        quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
        price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'Total amount cannot be negative'],
    },
    shippingAddress: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, trim: true },
        country: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true },
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'cod', 'bank_transfer'],
        required: true,
    },
    orderNotes: {
        type: String,
        trim: true,
        maxlength: [1000, 'Order notes cannot exceed 1000 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
}, { timestamps: true });

orderSchema.index({ user: 1, status: 1 });// Index for user orders and status filtering

export default mongoose.model('Order', orderSchema)