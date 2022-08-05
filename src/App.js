import Header from "./components/main/header.component/Header";
import Home from "./pages/home.page/home.page";
import Shop from "./pages/shop.page/Shop.page";
import Cart from "./pages/cart.page/Cart.page";
import NotFound from "./pages/not-found.page/NotFound";
import LogIn from "./pages/login.page/Login.page";
import SignUp from "./pages/signup.page/Signup.page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
