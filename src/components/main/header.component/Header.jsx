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
        if (user) {
            checkStatus(user).then((res) => setStatus(res));
            getFullAmountOfItemsInCart(user).then((res) => setAmount(res));
        }
    }, [user]);

    const handlePageSelect = () => {
        setMenuOpened(false);
    };

    window.addEventListener("scroll", detectStroll);

    window.addEventListener("click", handleClick);

    if (loading) return <Loading />;
    if (error) return <p className="warning">Something Went Wrong</p>;

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
                    <li>
                        {!user ? (
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button"
                                to="/register"
                            >
                                register
                            </NavLink>
                        ) : (
                            ""
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
