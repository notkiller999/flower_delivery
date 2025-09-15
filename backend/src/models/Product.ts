import { Schema, model, Document } from 'mongoose';
import { IShop } from './Shop';

export interface IProduct extends Document {
  shop: IShop['_id'];
  title: string;
  description?: string;
  price: number;
  images?: string[];
  dateAdded?: Date;
  favorite?: boolean;
}

const ProductSchema = new Schema<IProduct>({
  shop: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
  title: String,
  description: String,
  price: Number,
  images: [String],
  dateAdded: { type: Date, default: Date.now },
  favorite: { type: Boolean, default: false }
});

export default model<IProduct>('Product', ProductSchema);
