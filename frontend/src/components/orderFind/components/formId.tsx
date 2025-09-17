import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findOrders } from "../../../features/orders/ordersSlice";

export default function FormId() {

    const [id, setId] = useState('')
    const dispatch = useDispatch();

    interface SubmitEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
        preventDefault: () => void;
    }

    const submit = (e: SubmitEvent, orderNumber: string) => {
        e.preventDefault()
        dispatch<any>(findOrders(`orderNumber=${orderNumber}`))
        setId('')
    }

    return (
        <Box component='form' display='flex' flexDirection='column'>
            <FormControl sx={{mt: 2}} required>
                <InputLabel htmlFor="addres-input">Order Id</InputLabel>
                <Input
                    name="address"
                    id="addres-input"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    sx={{ mb: 1 }}
                />
            </FormControl>
            <Button 
                variant="contained" 
                type="submit"
                disabled={id ? false : true}
                sx={{alignSelf: 'center', maxWidth: '200px'}}
                onClick={(e) => submit(e, id)}
                >
                Search order
            </Button>
        </Box>
    )
}