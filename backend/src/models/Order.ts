import mongoose, { Schema, model, Document } from 'mongoose';

interface IOrderItem {
  product: any;
  qty: number;
  price: number;
}

export interface IOrder extends Document {
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

export default model<IOrder>('Order', OrderSchema);
