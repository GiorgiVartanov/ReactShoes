import Header from "./components/main/header/Header";
import Home from "./pages/home.page/home.page";
import Cart from "./pages/cart.page/Cart.page";
import About from "./pages/about.page/About";
import ItemPage from "./pages/item.page/Item.page";
import NotFound from "./pages/not-found.page/NotFound";
import LogIn from "./pages/login.page/Login.page";
import Register from "./pages/register.page/Register.page";
import AdminPanel from "./pages/admin-panel.page/AdminPanel.page";
import Footer from "./components/main/footer/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase/firebase";

// context that will store user object, loading, and error.
export const UserContext = createContext([null, true, null]);

function App() {
    // if user is not logged in user will be null
    const [user, loading, error] = useAuthState(auth);

    const providerValue = useMemo(
        () => [user, loading, error],
        [user, loading, error]
    );

    return (
        <UserContext.Provider value={providerValue}>
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
