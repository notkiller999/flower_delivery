import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../../features/shops/shopsSlice';
import { Stack, Divider } from '@mui/material';
import { RootState } from '../../store/store';
import ShopCard from './ShopCard';

export default function ShopList(){
    const dispatch = useDispatch();
    const shops = useSelector((store: RootState) => store.shops.items);

    useEffect(()=>{
        dispatch<any>(fetchShops());
    },[dispatch]);

    return (
        <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}>
                {shops.map(shop => {
                    return <ShopCard key={shop._id} shop={shop}/>
                }) }
                
        </Stack>
    );
}
