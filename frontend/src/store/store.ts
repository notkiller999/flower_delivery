import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import shopsReducer from '../features/shops/shopsSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    shops: shopsReducer,
    cart: cartReducer,
    orders: ordersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
