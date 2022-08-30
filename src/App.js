import Header from "./components/main/header.component/Header";
import Home from "./pages/home.page/home.page";
import Cart from "./pages/cart.page/Cart.page";
import About from "./pages/about.page/About";
import ItemPage from "./pages/item.page/Item.page";
import NotFound from "./pages/not-found.page/NotFound";
import LogIn from "./pages/login.page/Login.page";
import Register from "./pages/register.page/Register.page";
import AdminPanel from "./pages/admin-panel.page/AdminPanel.page";
import Footer from "./components/main/footer.component/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase/firebase";

export const UserContext = createContext([null, true, null]);

function App() {
    const [user, loading, error] = useAuthState(auth);

    return (
        <UserContext.Provider value={[user, loading, error]}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/buy/:id" element={<ItemPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/adminpanel" element={<AdminPanel />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </UserContext.Provider>
    );
}

export default App;
