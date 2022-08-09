import "./header.scss";

import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../firebase";
import { BsCart } from "react-icons/bs";
import { ImMenu, ImCross } from "react-icons/im";

const Header = ({ currentUser }) => {
    const savedHeader = useRef(null);

    const [user, loading, error] = useAuthState(auth);
    const [scrolled, setScrolled] = useState(false);
    const [name, setName] = useState("");

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
        // check if clicked outside of element
        if (savedHeader.current && !savedHeader.current.contains(e.target)) {
            setMenuOpened(false);
        }
    };

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

            <button
                className="hamburger-menu-button"
                onClick={() => {
                    setMenuOpened(!menuOpened);
                }}
            >
                {menuOpened ? (
                    <ImCross
                        style={{
                            pointerEvents: "none",
                        }}
                    />
                ) : (
                    <ImMenu
                        style={{
                            pointerEvents: "none",
                        }}
                    />
                )}
            </button>
            <nav className={menuOpened ? "nav-menu-opened" : ""}>
                <ul>
                    <li>
                        <NavLink
                            onClick={handlePageSelect}
                            className="link-button"
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={handlePageSelect}
                            className="link-button"
                            to="/shop"
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
                    <li>
                        {user ? (
                            <NavLink
                                onClick={handlePageSelect}
                                className="link-button cart-link-button"
                                to="/cart"
                            >
                                <BsCart />
                            </NavLink>
                        ) : null}
                    </li>
                    <li>
                        {user ? (
                            <button className="link-button" onClick={logout}>
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
