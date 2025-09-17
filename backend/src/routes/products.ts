import { Router } from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';

const router = Router();

router.get('/', async (req, res) => {  
  try {
    const { shop, page = '1', limit = '12', sort, order = 'asc', favoriteIds} = req.query as any;
    const query: any = {};
    if (shop) query.shop = new mongoose.Types.ObjectId(shop);
    
    let favIds: string[] = [];    

    if (typeof favoriteIds === 'string') {
        favIds = favoriteIds.split(',').filter(Boolean);
    }

    const sortObj: any = {};
    if (sort) sortObj[sort] = order === 'asc' ? 1 : -1;

    const pipeline: any[] = [
        { $match: query },
    ];

    if (favIds.length > 0) {
        pipeline.push({
            $addFields: { 
            isFavorite: { $in: [{ $toString: '$_id' }, favIds] } 
            }
        });
        pipeline.push({
            $sort: { isFavorite: -1, ...sortObj } 
        });
    } else if (Object.keys(sortObj).length > 0) {
        pipeline.push({ $sort: sortObj });
    }

    pipeline.push(
        { $skip: (Number(page)-1)*Number(limit) },
        { $limit: Number(limit) }
    );


    const products = await Product.aggregate(pipeline);

    const total = await Product.countDocuments(query);
        res.json({ data: products, total });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const p = await Product.findById(req.params.id).populate('shop');
        res.json(p);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
