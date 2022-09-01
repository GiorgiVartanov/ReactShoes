import "./header.scss";

import HamburgerButton from "../../utility/hamburger-button/HamburgerButton";
import Loading from "../../utility/loading/Loading";

import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, checkStatus } from "../../../firebase/firebase";
import { BsCart } from "react-icons/bs";
import { useContext } from "react";

import { getFullAmountOfItemsInCart } from "../../../firebase/firebase";
import { UserContext } from "../../../App";

const Header = () => {
    const [user, loading, error] = useContext(UserContext);

    const savedHeader = useRef(null);

    const [scrolled, setScrolled] = useState(false);
    const [status, setStatus] = useState();

    const [amount, setAmount] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // checking user status, if it is admin we will show adminpanel in a navbar
            checkStatus(user).then((res) => setStatus(res));
            getFullAmountOfItemsInCart(user).then((res) => setAmount(res));
        }
    }, [user]);

    const handlePageSelect = () => {
        setMenuOpened(false);
    };

    useEffect(() => {
        const onScroll = () => {
            // if page is scrolled navbar will became thinner and transparent
            if (window.scrollY >= 26) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => {
            // When using the useEffect hook, we’re adding
            // that event listener when the component mounts,
            // but when it unmounts, that event listener is
            // still hanging out waiting for events.

            // so to clean it up, we can return a new function
            // which removes that event listener
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            // check if clicked outside of header or it's children, if so hide dropdowned navbar
            if (
                savedHeader.current &&
                !savedHeader.current.contains(e.target)
            ) {
                setMenuOpened(false);
            }
        };

        window.addEventListener("click", onClick);

        return () => {
            window.removeEventListener("click", onClick);
        };
    }, []);

    // if (!status && user !== null) return; // if status is undefined while user is logger in
    // if (loading) return;
    if (error) return;

    return (
        <header
            ref={savedHeader}
            className={scrolled && !menuOpened ? "header-scrolled " : ""}
        >
            <Link to="/">
                <h1>ReactShoes</h1>
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
                        // shown if user is logged in
                        <li>
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button cart-link-button"
                                to="/cart"
                            >
                                <span className="amount-of-items-in-cart">
                                    {amount}
                                </span>
                                <BsCart />
                            </NavLink>
                        </li>
                    ) : null}
                    {status === "admin" && user ? (
                        // shown if user is an admin and logged in
                        <li>
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button"
                                to="/adminpanel"
                            >
                                Admin Panel
                            </NavLink>
                        </li>
                    ) : null}
                    <li>
                        {user ? (
                            // shown if user is logged in
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
                            // shown if user is not logged in
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button"
                                to="/login"
                            >
                                log in
                            </NavLink>
                        )}
                    </li>

                    {!user ? (
                        // shown if user is not logged in
                        <li>
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button"
                                to="/register"
                            >
                                register
                            </NavLink>
                        </li>
                    ) : (
                        ""
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
