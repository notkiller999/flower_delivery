import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const createOrder = createAsyncThunk('orders/create', async (payload: any) => {
    console.log(payload);
    
  const res = await api.post('/orders', payload);
  return res.data;
});

export const fetchOrder = createAsyncThunk('orders/fetch', async (id: string) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { current: null as any, status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createOrder.fulfilled, (state, action) => { state.current = action.payload; });
    builder.addCase(fetchOrder.fulfilled, (state, action) => { state.current = action.payload; });
  }
});

export default ordersSlice.reducer;
