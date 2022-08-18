import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style.css';
import { Blog } from './views/Blog/Blog';
import { BlogDetail } from './views/Blog/BlogDetail';
import { Home } from './views/Home';
import Layout from './views/Layout/Layout';
import Payment from './views/Payment/Payment';
import PaymentPaypal from './views/Payment/PaymentPaypal';
import PaymentPayPalResult from './views/Payment/PaymentPaypalResult';
import PaymentVnPay from './views/Payment/PaymentVnPay';
import PaymentVnPayResult from './views/Payment/PaymentVnPayResult';
import { Product } from './views/Product/Product';
import { ProductDetail } from './views/Product/ProductDetail';
import { CartProvider, useCart } from "./Components/Cart/useCart";
import { Cart } from './views/Cart/Cart';
import { CheckOut } from './views/Cart/CheckOut';
import { About } from './views/Post/About';
import { Policy } from './views/Post/Policy';
import { Contact } from './views/Post/Contact';
import { Login } from './views/Auth/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="payment">
                    <Route index element={<Payment />} />
                    <Route path='paypal'>
                        <Route index element={<PaymentPaypal />}></Route>
                        <Route path='return' element={<PaymentPayPalResult />}></Route>
                    </Route>
                    <Route path='vnpay'>
                        <Route index element={<PaymentVnPay />}></Route>
                        <Route path='return/:orderId' element={<PaymentVnPayResult />}></Route>
                    </Route>
                </Route>

                <Route path='' element={<Layout />}>
                    <Route index element={<Home></Home>}></Route>
                    <Route path="login" element={<Login />}> </Route>
                    <Route path='about' element={<About></About>}></Route>
                    <Route path='policy' element={<Policy></Policy>}></Route>
                    <Route path='contact' element={<Contact></Contact>}></Route>
                    <Route path='blog'>
                        <Route index element={<Blog></Blog>}></Route>
                        <Route path=":idCategory" element={<Blog></Blog>}></Route>
                        <Route path='detail/:id' element={<BlogDetail></BlogDetail>}></Route>
                    </Route>
                    <Route path='product' >
                        <Route index element={<Product></Product>}></Route>
                        <Route path=":idCategory" element={<Product></Product>}></Route>
                        <Route path='detail/:id' element={<ProductDetail></ProductDetail>}></Route>
                    </Route>
                    <Route path='cart' >
                        <Route index element={<Cart></Cart>}></Route>
                        <Route path="checkout" element={<CheckOut></CheckOut>}></Route>
                    </Route>
                    <Route path='checkout' element={<CheckOut></CheckOut>}> </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default App;
