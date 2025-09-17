import { Router } from 'express';
import Order from '../models/Order';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const order = new Order(payload);
        await order.save();
        res.status(201).json(order);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {   
    try {
        const order = await Order.findById(req.params.id).populate('items.product').populate('shop');
        res.json(order);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/', async (req, res) => {
    try { 
        if (req.query.orderNumber) {
            const orderNumber: number = +req.query.orderNumber
            const orders = await Order.find({orderNumber: orderNumber}).populate('items.product').populate('shop');
            res.json(orders)
            return
        }

        if(req.query.email && req.query.phone) {
            const {email, phone} = req.query;
            const orders = await Order.find({email ,phone}).populate('items.product').populate('shop');
            res.json(orders)
            return
        }
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
})

export default router;
