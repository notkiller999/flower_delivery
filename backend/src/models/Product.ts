import mongoose, { Schema, model, Document } from 'mongoose';
import { IShop } from './Shop';

export interface IProduct extends Document {
    _id: mongoose.Types.ObjectId;
  shop: IShop['_id'];
  title: string;
  description?: string;
  price: number;
  images?: string[];
  dateAdded?: Date;
}

const ProductSchema = new Schema<IProduct>({
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  title: String,
  description: String,
  price: Number,
  images: [String],
  dateAdded: { type: Date, default: Date.now },
});

export default model<IProduct>('Product', ProductSchema);
