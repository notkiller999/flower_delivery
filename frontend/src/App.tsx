import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container} from '@mui/material';
import CartPage from './pages/CartPage';
import OrderDetails from './pages/OrderDetails';
import Header from './components/Header';
import MainPage from './pages/MainPage';

export default function App(){
    return (
        <BrowserRouter
            future={{
            v7_startTransition: true,
        }}>
        <Header/>
        <Container sx={{ mt: 3 }}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
        </Container>
        </BrowserRouter>
    );
}
