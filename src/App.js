import Header from "./components/main/header.component/Header";
import Home from "./pages/home.page/home.page";
import Shop from "./pages/shop.page/Shop.page";
import Cart from "./pages/cart.page/Cart.page";
import About from "./pages/about.page/About";
import ItemPage from "./pages/item.page/Item.page";
import NotFound from "./pages/not-found.page/NotFound";
import LogIn from "./pages/login.page/Login.page";
import Register from "./pages/register.page/Register.page";
import Footer from "./components/main/footer.component/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/shop" element={<Shop />} /> */}
                <Route path="/shop/:id" element={<ItemPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
