import "./header.scss";

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../firebase";
import { BsCart } from "react-icons/bs";

const Header = ({ currentUser }) => {
    const [user, loading, error] = useAuthState(auth);
    const [scrolled, setScrolled] = useState(false);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const detectStroll = () => {
        if (window.scrollY >= 20) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    window.addEventListener("scroll", detectStroll);

    return (
        <header className={scrolled ? "header-scrolled " : ""}>
            <h1>
                <Link to="/">ReactClothes</Link>
            </h1>

            <nav>
                <ul>
                    <li>
                        <NavLink className="link-button" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link-button" to="/shop">
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link-button" to="/about">
                            About
                        </NavLink>
                    </li>
                    <li>
                        {user ? (
                            <NavLink
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
                            <NavLink className="link-button" to="/login">
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
