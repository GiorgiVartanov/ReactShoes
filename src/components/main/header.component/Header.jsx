import "./header.scss";

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../firebase";

const Header = ({ currentUser }) => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    return (
        <header>
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
                        {user ? (
                            <NavLink className="link-button" to="/cart">
                                Cart
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
