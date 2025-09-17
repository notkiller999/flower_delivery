import { Router } from 'express';
import Shop from '../models/Shop';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const shops = await Shop.find();
        res.json(shops);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
        res.json(shop);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
