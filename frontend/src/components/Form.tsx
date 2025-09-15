import { Box, Button, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

import PhoneMask from "./mask/PhoneMask";
import EmailMask from "./mask/EmailMask";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { CartState } from "../features/cart/cartSlice";

type PropsCart = {
    cart: CartState
    total: any
}

export default function Form({cart, total}: PropsCart) {    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", phone: "", address: "" });
    const [emailError, setEmeilError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [formError, setFormError] = useState(true);
    const validateEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    useEffect(() => {
        const { email, phone, address } = form;
        setFormError(
            !email ||
            !phone ||
            !address ||
            emailError ||
            phoneError
        );
    }, [form, emailError, phoneError]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    
    const handleBlurEmail = () => {
        if (!form.email) { setEmeilError(false); return; }
        setEmeilError(validateEmail.test(form.email) ? false : true);
    };

    const handleBlurPhone = () => {
        if (!form.phone) {setPhoneError(false); return; }
        setPhoneError(form.phone.replace(/\D/g, '').length === 12 ? false : true);
    };

    interface SubmitEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
        preventDefault: () => void;
    }

    interface OrderItem {
        product: string;
        qty: number;
        price: number;
    }

    interface OrderPayload {
        email: string;
        phone: string;
        deliveryAddress: string;
        deliveryLocation: {
            type: string;
            coordinates: [number, number];
        };
        items: OrderItem[];
        totalPrice: any;
    }

    const submit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (cart.items.length === 0) return alert("Cart is empty");
        const payload: OrderPayload = {
            email: form.email,
            phone: form.phone,
            deliveryAddress: form.address,
            deliveryLocation: { type: "Point", coordinates: [0, 0] },
            items: cart.items.map((i: any) => ({
                product: i.product._id,
                qty: i.qty,
                price: i.product.price,
                shop: i.product.shop
            })),
            totalPrice: total,
        };
        const resAction = await dispatch<any>(createOrder(payload));
        if (resAction.payload && resAction.payload._id) {
            dispatch(clearCart());
            navigate(`/orders/${resAction.payload._id}`);
        } else {
            alert("Order failed");
        }
    };

    return (
        <Box component='form' display='flex' flexDirection='column' >
            <FormControl sx={{mt: 2}} required error={phoneError}>
                <InputLabel htmlFor="phone-input">Phone</InputLabel>
                <Input
                    value={form.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone-input"
                    sx={{ mb: 1 }}
                    inputComponent={PhoneMask as any}
                    onBlur={handleBlurPhone}
                    aria-describedby='phone-input-helper'
                />
                <FormHelperText id='phone-input-helper'>
                    {emailError ? 'Please enter correct phone' : ''}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{mt: 2}} required error={emailError}>
                <InputLabel 
                    htmlFor="email-input">
                        Email
                </InputLabel>
                <Input
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    id="email-input"
                    sx={{ mb: 1 }}
                    inputComponent={EmailMask as any}
                    onBlur={handleBlurEmail}
                    onFocus={() => setEmeilError(false)}
                    aria-describedby='email-input-helper'
                />
                <FormHelperText id='email-input-helper'>
                    {emailError ? 'Please enter correct email' : ''}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{mt: 2}} required>
                <InputLabel htmlFor="addres-input">Addres</InputLabel>
                <Input
                    name="address"
                    id="addres-input"
                    value={form.address}
                    onChange={handleChange}
                    sx={{ mb: 1 }}
                />
            </FormControl>
                <Button 
                    variant="contained" 
                    type="submit" 
                    onClick={submit}
                    disabled={formError}>
                    Place order
                </Button>
            
        </Box>

    )
}