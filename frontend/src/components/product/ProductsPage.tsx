import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, Product } from '../../features/products/productsSlice';
import ProductCard from './ProductCard';
import { Grid, Box, Pagination } from '@mui/material';
import { RootState} from '../../store/store';


export default function ProductsPage(){
    const shopId = useSelector((store: RootState) => store.shops.shopId)
    const dispatch = useDispatch();
    const { items, total } = useSelector((store: RootState) => store.products);
    const [page, setPage] = useState(1);
    const limit = 12;
    
    useEffect(()=>{ 
        dispatch<any>(fetchProducts({ shop: shopId, page, limit })); 
    },[dispatch, shopId, page]);

    const totalPages = Math.max(1, Math.ceil((total||0)/limit));
    return (
        <Box width='100%'>
        <Grid container spacing={2}>
            {items.map((item: Product) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
                <ProductCard product={item} shopId={shopId} />
            </Grid>
            ))}
        </Grid>
        <Box sx={{ display:'flex', justifyContent:'center', mt:2 }}>
            <Pagination count={totalPages} page={page} onChange={(e,i)=>setPage(i)} />
        </Box>
        </Box>
    );
}
