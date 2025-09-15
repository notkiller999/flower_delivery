import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db';
import Shop from '../models/Shop';
import Product from '../models/Product';

const dataPath = path.join(__dirname, '..', 'data', 'data.json');
const raw = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(raw);

const run = async () => {
  await connectDB();

  await Shop.deleteMany({});
  await Product.deleteMany({});

  const shopsMap: any = {};
  for (const s of data.shops) {
    const shop = new Shop({
      name: s.name,
      address: s.address,
      location: s.location,
      phone: s.phone
    });
    await shop.save();
    shopsMap[s._id] = shop._id;
  }

  for (const p of data.products) {
    const product = new Product({
      shop: shopsMap[p.shopRef],
      title: p.title,
      description: p.description,
      price: p.price,
      images: p.images,
      dateAdded: p.dateAdded,
      favorite: p.favorite
    });
    await product.save();
  }

  console.log('Seed completed');
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
