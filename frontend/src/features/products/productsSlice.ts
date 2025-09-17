import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export interface Product { _id: string; title: string; description?: string; price: number; images?: string[];}

interface Params {shop: string, page: number, limit: number, sort: string, favoriteIds: string[]}


export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async ({ shop = '', page = 1, limit = 12, sort = '', favoriteIds}: Partial<Params> = {}) => {

    const getFavoriteIds = (): string[] => {
        try {
            const fav = localStorage.getItem('favorite');
            if(fav) {
                return JSON.parse(fav)
            } else {
                return []
            }
        } catch (e) {
            return []
        }        
    };

    const favorite = getFavoriteIds(); 
    const params = { shop, page, limit, sort, favoriteIds: favorite.join(',')};
    const res = await api.get('/products', { params });    
    return res.data
  }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: { items: [] as Product[], total: 0, status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload.data;
            state.total = action.payload.total;
            state.status = 'succeeded';
            });
            builder.addCase(fetchProducts.pending, state => { state.status = 'loading'; });
            builder.addCase(fetchProducts.rejected, state => { state.status = 'failed'; });
        }
    }
);

export default productsSlice.reducer;
