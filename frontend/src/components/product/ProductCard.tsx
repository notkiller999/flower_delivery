import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, OutlinedInput } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart} from '../../features/cart/cartSlice';
import { Product } from '../../features/products/productsSlice';

type ProductListProp = {
    product: Product
    shopId: string
}

export default function ProductCard({ product}: ProductListProp) {
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const num = +e.target.value.replace(/\D/g, '')
        if (num > 0) {
            setQty(num)
        }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="160" image={product.images?.[0] || 'https://via.placeholder.com/400x300'} />
        <CardContent>
            <Typography gutterBottom variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
            <Typography variant="subtitle1">{product.price} $</Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => dispatch(addToCart({ product, qty}))}>Add</Button>
            <Box display='flex'>
                <Button 
                    size='small'
                    variant='text'
                    onClick={() => {
                        if(qty > 1) {
                            setQty(qty => qty -= 1)
                        }
                    }}>
                    -
                </Button>
                <OutlinedInput 
                    sx={{maxHeight: 32}}
                    value={qty}
                    onChange={handleChange}/>
                <Button 
                    size='small'
                    variant='text'
                    onClick={() => {
                        setQty(qty => qty += 1)
                    }}>
                    +
                </Button>
            </Box>
        </CardActions>
        </Card>
    );
}
