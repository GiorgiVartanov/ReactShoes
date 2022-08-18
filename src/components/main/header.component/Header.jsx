import "./header.scss";

import HamburgerButton from "../../utility/hamburger-button/HamburgerButton";

import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, checkStatus } from "../../../firebase";
import { BsCart } from "react-icons/bs";

const Header = () => {
    const savedHeader = useRef(null);

    const [user, loading, error] = useAuthState(auth);
    const [scrolled, setScrolled] = useState(false);
    const [status, setStatus] = useState();

    const [menuOpened, setMenuOpened] = useState(false);

    const navigate = useNavigate();

    const detectStroll = () => {
        if (window.scrollY >= 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleClick = (e) => {
        // check if clicked outside of header, if so hide dropdowned navbar
        if (savedHeader.current && !savedHeader.current.contains(e.target)) {
            setMenuOpened(false);
        }
    };

    useEffect(() => {
        if (user) checkStatus(user).then((res) => setStatus(res));
    }, [user]);

    const handlePageSelect = () => {
        setMenuOpened(false);
    };

    window.addEventListener("scroll", detectStroll);

    window.addEventListener("click", handleClick);

    return (
        <header
            ref={savedHeader}
            className={scrolled && !menuOpened ? "header-scrolled " : ""}
        >
            <Link to="/">
                <h1>ReactClothes</h1>
            </Link>

            <HamburgerButton
                onClick={() => {
                    setMenuOpened(!menuOpened);
                }}
                shown={menuOpened}
                scrolled={scrolled}
            />
            <nav className={menuOpened ? "nav-menu-opened" : ""}>
                <ul className="nav-link-list">
                    <li>
                        <NavLink
                            onClick={handlePageSelect}
                            className="link-button"
                            to="/"
                        >
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={handlePageSelect}
                            className="link-button"
                            to="/about"
                        >
                            About
                        </NavLink>
                    </li>
                    {user ? (
                        <li>
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button cart-link-button"
                                to="/cart"
                            >
                                <BsCart />
                            </NavLink>
                        </li>
                    ) : null}
                    {status === "admin" && user ? (
                        <li>
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button"
                                to="/addproduct"
                            >
                                Add Product
                            </NavLink>
                        </li>
                    ) : null}
                    <li>
                        {user ? (
                            <button
                                className="link-button"
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                log out
                            </button>
                        ) : (
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button"
                                to="/login"
                            >
                                log in
                            </NavLink>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
