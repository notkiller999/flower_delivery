import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem { product: any; qty: number; }
export interface CartState { items: CartItem[]; }

const initial: CartState = JSON.parse(localStorage.getItem('cart') || 'null') || { items: []};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initial,
    reducers: {
        addToCart(state, action: PayloadAction<{ product: any; qty?: number;}>) {
            const { product, qty = 1} = action.payload;
            const idx = state.items.findIndex(i => i.product._id === product._id);
            if (idx >= 0) state.items[idx].qty += qty;
            else state.items.push({ product, qty });
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(i => i.product._id !== action.payload);
            if (state.items.length === 0)
            localStorage.setItem('cart', JSON.stringify(state));
        },
        changeQty(state, action: PayloadAction<{ productId: string; qty: number }>) {
            const { productId, qty } = action.payload;
            const it = state.items.find(i => i.product._id === productId);
            if (it) it.qty = qty;
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart(state) {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
});

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
