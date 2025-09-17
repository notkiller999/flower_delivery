import { Avatar, Box, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Order = {
    orderNumber: number;
    items: any[],
    totalPrice: number
};

export default function OrderFinded () {

    const orders = useSelector((store: RootState) => store.orders.current) as Order[];    

    return (
        <Box>
            {orders ? orders.map((order: Order) => {
                return(
                    <Box key={order.orderNumber}
                        padding={2}
                        mt={2}
                        sx={{border: '2px solid #4b4b4b', borderRadius: '20px'}}>
                        <Typography variant="h6">Order id: {order.orderNumber}</Typography>
                        <Box>
                            {order.items.map(item => {
                                return(
                                    <ListItem 
                                        key={item.product._id}
                                        sx={{gap: 2}}
                                    >
                                        <Avatar src={item.product.images[0]}
                                            variant='rounded'
                                        />
                                        <ListItemText 
                                            primary={item.product.title} 
                                            secondary={`Count: ${item.qty} — ${item.price} $`} 
                                        />
                                    </ListItem>
                                )
                            })}
                        </Box>
                        <Typography pl={2}>Total price: {order.totalPrice.toFixed(2)}</Typography>
                    </Box>
                )
            }) : null}
        </Box>
    )
}