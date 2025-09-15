import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../features/orders/ordersSlice';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { RootState } from '../store/store';

export default function OrderDetails(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((s: RootState) => s.orders.current);

  useEffect(()=>{ if(id) dispatch<any>(fetchOrder(id!)); },[dispatch,id]);

  if(!order) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h5">Order {order._id}</Typography>
      <Typography>Created: {new Date(order.createdAt).toLocaleString()}</Typography>
      <Typography>Delivery: {order.deliveryAddress}</Typography>
      <List>
        {order.items.map((it:any) => (
          <ListItem key={it._id || (it.product && it.product._id)}>
            <ListItemText primary={it.product.title || (it.product && it.product.title)} secondary={`Qty: ${it.qty} — ${it.price} $`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: {order.totalPrice} $</Typography>
    </Box>
  );
}
