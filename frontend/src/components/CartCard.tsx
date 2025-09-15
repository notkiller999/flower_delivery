import { Box, Button, Card, CardActions, CardContent, CardMedia, OutlinedInput, Typography } from "@mui/material";
import { CartItem, changeQty, removeFromCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type PropsProduct = {
    item: CartItem;
}

export default function CartCard({item}: PropsProduct) {

    const dispatch = useDispatch()    
    const {product, qty} = item;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, productId: string) => {
        const num = +e.target.value.replace(/\D/g, '')
        if (num > 0) {
            dispatch(changeQty({productId, qty: num}))
        }
    }

    return (
        <Card sx={{marginTop: 2, position: 'relative'}}>
            <Box position='absolute' right={10} top={13} 
                sx={{cursor: 'pointer', 
                    color: 'rgba(0,0,0,0.3)',
                        '&:hover': {
                            color: 'rgba(0,0,0,1)'
                        }
                    }}
                onClick={() => dispatch(removeFromCart(product._id))}>
                <DeleteForeverIcon/>
            </Box>
            <Box display='flex'>
                <CardMedia component="img" height="160" image={product.images?.[0] || 'https://via.placeholder.com/400x300'} />
                <Box>
                    <CardContent sx={{padding: 1}}>
                        <Typography gutterBottom variant="h6">{product.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                        <Typography variant="subtitle1">{product.price} $</Typography>
                    </CardContent>
                    <CardActions>
                        <Box display='flex'>
                            <Button 
                                size='small'
                                variant='text'
                                onClick={() => {
                                    dispatch(changeQty({productId: product._id, qty: qty - 1}))
                                }}>
                                -
                            </Button>
                            <OutlinedInput 
                                sx={{maxHeight: 32}}
                                value={qty}
                                onChange={(e) => handleChange(e, product._id)}/>
                            <Button 
                                size='small'
                                variant='text'
                                onClick={() => {
                                    dispatch(changeQty({productId: product._id, qty: qty + 1}))
                                }}>
                                +
                            </Button>
                        </Box>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    )
}