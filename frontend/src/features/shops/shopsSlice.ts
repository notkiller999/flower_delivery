import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export interface Shop { _id: string; name: string; address?: string; phone?: string; }

export const fetchShops = createAsyncThunk('shops/fetch', async () => {
    const res = await api.get('/shops');
    return res.data as Shop[];
});

const shopsSlice = createSlice({
    name: 'shops',
    initialState: { items: [] as Shop[], status: 'idle', shopId: '' },
    reducers: {
        changeShop: (state, action) => {
            state.shopId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchShops.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
        state.shopId = action.payload[0]._id;
        });
    }
});

const {actions, reducer} = shopsSlice;

export const {changeShop} = actions;

export default reducer;

