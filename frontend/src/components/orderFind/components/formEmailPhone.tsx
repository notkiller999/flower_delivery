import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PhoneMask from "../../mask/PhoneMask";
import EmailMask from "../../mask/EmailMask";
import { findOrders } from "../../../features/orders/ordersSlice";

interface SubmitEvent extends React.MouseEvent<HTMLButtonElement, MouseEvent> {
    preventDefault: () => void;
}

export default function FormEmailPhone() {
    
    const dispatch = useDispatch()
    const [form, setForm] = useState({ email: "", phone: ""});
    const [emailError, setEmeilError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [formError, setFormError] = useState(true);
    const validateEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    useEffect(() => {
            const { email, phone} = form;
            setFormError(
                !email ||
                !phone ||
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

    const submit = (e: SubmitEvent, email: string, phone: string) => {
        e.preventDefault()
        dispatch<any>(findOrders(`email=${email}&phone=${phone}`))
    }

    return (
        <Box component='form' display='flex' flexDirection='column'>
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
            <Button 
                variant="contained" 
                type="submit"
                onClick={(e) => submit(e, form.email, form.phone.replace(/\D/g, ''))}
                disabled={formError}
                sx={{alignSelf: 'center', maxWidth: '200px'}}>
                Search orders
            </Button>
        </Box>
    )
}