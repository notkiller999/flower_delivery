import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {Box, Typography, List, ListItem, ListItemText} from "@mui/material";
import Form from "../components/Form";
import { CartItem } from "../features/cart/cartSlice";
import CartCard from "../components/CartCard";

export default function CartPage() {
	const cart = useSelector((store: RootState) => store.cart);

	const total = cart.items.reduce(
		(sum: number, i: CartItem) => sum + i.product.price * i.qty,
		0
	);

	return (
		<Box>
            <Typography variant="h5">Cart</Typography>
			<Box display="flex" gap={2} width="100%">
                <Box flex="0 0 30%">
                    <Form cart={cart} total={total}/>
                </Box>
                <Box flex="1">
                    <List>
                        {cart.items.map((item: CartItem) => (
                            <CartCard key={item.product._id} item={item}/>
                        ))}
                    </List>
                </Box>
            </Box>
			<Typography textAlign='right' variant="h6">Total: {total.toFixed(2)} $</Typography>
		</Box>
	);
}
