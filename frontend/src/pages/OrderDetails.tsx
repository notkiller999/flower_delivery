import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../features/orders/ordersSlice';
import { Typography, Box, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { RootState } from '../store/store';

export default function OrderDetails(){
    const { id } = useParams();
    
    const dispatch = useDispatch();
    const order = useSelector((store: RootState) => store.orders.current);

    useEffect(()=>{
        if(id) dispatch<any>(fetchOrder(id!)); 
    },[dispatch,id]);

    if(!order) return <div>Loading...</div>;

    return (
        <Box>
            <Typography variant='h3' textAlign='center'>Order Details</Typography>
            <Typography variant="h5">Order id: {order.orderNumber}</Typography>
            <Typography>Date: {new Date(order.createdAt).toLocaleString()}</Typography>
            <Typography>Delivery address: {order.deliveryAddress}</Typography>
            <List>
                {order.items.map((item:any) => (
                <ListItem key={item._id || (item.product && item.product._id)}
                    sx={{gap: 2}}
                >
                    <Avatar src={item.product.images[0]}
                        variant='rounded'
                    />
                    <ListItemText primary={item.product.title || (item.product && item.product.title)} secondary={`Count: ${item.qty} — ${item.price} $`} />
                </ListItem>
                ))}
            </List>
            <Typography variant="h6">Total: {order.totalPrice.toFixed(2)} $</Typography>
        </Box>
  );
}
