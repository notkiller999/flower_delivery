import { AppBar, Divider, Link, Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchProducts } from "../features/products/productsSlice";
import { useState } from "react"
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation()

    const [activeLinks, changeActiveLink] = useState('')
    const dispatch = useDispatch()
    const shopId = useSelector((store: RootState) => store.shops.shopId)

    const onHandleClick = (name: string) => {
        if (activeLinks !== name) {
            dispatch<any>(fetchProducts({ shop: shopId, sort: name}))
            changeActiveLink( name)
        }
    }

    return (
        <AppBar position="static">
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Typography variant="h6">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'white' }} />}
                spacing={2}>
                <Link href='/' color="inherit" underline={location.pathname === '/' ? 'always' : 'hover'}>
                    Shops
                </Link>
                <Link href='/cart' color="inherit" underline={location.pathname === '/cart' ? 'always' : 'hover'}>
                    Shoping cart
                </Link>
            </Stack>
          </Typography>
          <Typography component='div' variant="body2">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'white' }} />}
                spacing={2}>
                <Typography 
                    color="inherit" 
                    sx={{cursor: activeLinks === 'price' ? 'default': 'pointer',
                        ':hover': activeLinks === 'price' ? {} : {textDecoration: 'underline'}}}
                    onClick={() => onHandleClick('price')}>
                        Sort by price
                </Typography>
                <Typography 
                    color="inherit" 
                    sx={{cursor: activeLinks === 'dateAdded' ? 'default': 'pointer',
                        ':hover': activeLinks === 'dateAdded' ? {} : {textDecoration: 'underline'}}}
                    onClick={() => onHandleClick('dateAdded')}>
                        Sort by date
                </Typography>
            </Stack>
          </Typography>
        </Toolbar>

      </AppBar>
    )
}