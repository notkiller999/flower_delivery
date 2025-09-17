import mongoose, { Schema, model, Document } from 'mongoose';
import { Counter } from './Counter';

interface IOrderItem {
    product: any;
    qty: number;
    price: number;
}

export interface IOrder extends Document {
    orderNumber: Number,
    _id: mongoose.Types.ObjectId;
    email?: string;
    phone?: string;
    deliveryAddress?: string;
    deliveryLocation?: { type: string; coordinates: number[] };
    items: IOrderItem[];
    totalPrice: number;
    shop?: any;
    createdAt?: Date;
}

const OrderSchema = new Schema<IOrder>({
    orderNumber: Number,
    email: String,
    phone: String,
    deliveryAddress: String,
    deliveryLocation: { type: { type: String, default: 'Point' }, coordinates: [Number] },
    items: [
        {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        qty: Number,
        price: Number
        }
    ],
    totalPrice: Number,
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    createdAt: { type: Date, default: Date.now }
});

OrderSchema.pre('save', async function () {
    if (!this.isNew) return;
    const counter = await Counter.findOneAndUpdate(
        { name: 'orders' },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );
    if (!counter) throw new Error('Could not get order counter');
    this.orderNumber = counter.count;
});

export default model<IOrder>('Order', OrderSchema);
