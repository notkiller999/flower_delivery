import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, OutlinedInput } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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
    const [fav , setFav] = useState(false)
    const favorite = localStorage.getItem('favorite');

    useEffect(() => {
        if(favorite && JSON.parse(favorite).indexOf(product._id) > -1 ) {
            setFav(true);
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const num = +e.target.value.replace(/\D/g, '')
        if (num > 0) {
            setQty(num)
        }
    }

    const setFavorite = () => {     
        const favorite = localStorage.getItem('favorite');   
        if (favorite) {
            const parsedFavorite = JSON.parse(favorite)
            const index = parsedFavorite.indexOf(product._id)
            
            if (index === -1) {
                parsedFavorite.push(product._id)
                localStorage.setItem('favorite', JSON.stringify(parsedFavorite))
                setFav(true)
            } else {
                parsedFavorite.splice(index, 1)
                localStorage.setItem('favorite', JSON.stringify(parsedFavorite))
                setFav(false)
            }
            return
        }
        localStorage.setItem('favorite', JSON.stringify([product._id]))
        setFav(true)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="160" image={product.images?.[0] || 'https://via.placeholder.com/400x300'} />
        <CardContent>
            <Typography gutterBottom variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
            
            <Box display='flex' justifyContent='space-between' mt={2}>
                <Typography variant="subtitle1">{product.price} $</Typography>
                <Box>
                    <Button sx={{height: 32, minWidth: 32}}
                        variant='text'
                        onClick={() => {
                            if(qty > 1) {
                                setQty(qty => qty -= 1)
                            }
                        }}>
                        -
                    </Button>
                    <OutlinedInput 
                        sx={{maxHeight: 32, width: 75}}
                        value={qty}
                        onChange={handleChange}/>
                    <Button sx={{height: 32, minWidth: 32}}
                        variant='text'
                        onClick={() => {
                            setQty(qty => qty += 1)
                        }}>
                        +
                    </Button>
                </Box>
            </Box>
        </CardContent>
        <CardActions sx={{justifyContent: 'space-between'}}>
            <Button size="small" onClick={() => dispatch(addToCart({ product, qty}))}>Add</Button>
            <Button onClick={setFavorite}>
                <FavoriteBorderOutlinedIcon sx={{color: fav ? 'red' : 'inherit'}}/>
            </Button>
        </CardActions>
        </Card>
    );
}
