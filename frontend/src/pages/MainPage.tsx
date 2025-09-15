import { Divider, Stack } from "@mui/material";
import ShopList from "../components/shops/ShopList";
import ProductsPage from "../components/product/ProductsPage";

export default function MainPage() {

    return(
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}>
                <ShopList/>
                <ProductsPage/>
        </Stack>
    )
}