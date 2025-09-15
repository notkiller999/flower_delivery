import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { shop, page = '1', limit = '12', sort, order = 'asc', favoriteFirst } = req.query as any;
    const query: any = {};
    if (shop) query.shop = shop;

    let sortObj: any = {};
    if (sort) sortObj[sort] = order === 'asc' ? 1 : -1;
    if (favoriteFirst === 'true') sortObj = { favorite: -1, ...sortObj };

    const p = await Product.find(query)
      .sort(sortObj)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(query);
    res.json({ data: p, total });
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
