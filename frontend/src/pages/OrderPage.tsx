import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import OrderFinded from "../components/orderFind/orderFinded";
import FormId from "../components/orderFind/components/formId";
import FormEmailPhone from "../components/orderFind/components/formEmailPhone";

export default function OrderPage() {
    const [finBy, setFind] = useState('phone')
    
    return (
        <Box display='flex' flexDirection='column' gap={2}>
            <Typography variant="h5" textAlign='center'>Find by:</Typography>
            <ButtonGroup sx={{justifyContent: 'center'}}
                disableElevation
                aria-label="Disabled button group"
                >
                <Button variant={finBy === 'phone' ? 'contained' : 'outlined'}
                 onClick={() => setFind('phone')}>
                    email & phone
                </Button>
                <Button variant={finBy === 'id' ? 'contained' : 'outlined'}
                 onClick={() => setFind('id')}>
                    Order id
                </Button>
            </ButtonGroup>
            {finBy === 'phone' ? <FormEmailPhone/> : <FormId/>}
            <OrderFinded/>
        </Box>
    );    
}