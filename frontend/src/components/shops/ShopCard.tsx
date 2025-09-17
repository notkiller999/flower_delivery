import { Button, CardContent, Typography } from '@mui/material';
import { changeShop, Shop } from '../../features/shops/shopsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type ShopListProps = {
    shop: Shop;
}

export default function ShopCard ({shop}: ShopListProps) {

    const dispatch = useDispatch()
    const shopId = useSelector((store: RootState) => store.shops.shopId)

    return (
        <Button key={shop._id} 
            onClick={() => dispatch(changeShop(shop._id))}
            disabled={shop._id === shopId ? true : false}>
                <CardContent>
                <Typography variant="h6">{shop.name}</Typography>
                <Typography variant="body2">{shop.address}</Typography>
                </CardContent>
        </Button>
    )
}