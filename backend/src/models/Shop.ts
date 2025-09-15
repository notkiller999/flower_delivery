import mongoose, { Schema, model, Document } from 'mongoose';

export interface IShop extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    address?: string;
    location?: { type: string; coordinates: number[] };
    phone?: string;
}

const ShopSchema = new Schema<IShop>({
  name: { type: String, required: true },
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  phone: String
});

ShopSchema.index({ location: '2dsphere' });

export default model<IShop>('Shop', ShopSchema);
