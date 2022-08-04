import "./header.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">
                <div className="header-title">
                    <h1>
                        Re<span>Act</span>
                        <span>Clothes</span>
                    </h1>
                </div>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link className="option" to="/shop">
                            Shop
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            <Link className="option" to="/userpage">
                                Home
                            </Link>
                        ) : null}
                    </li>
                    <li>
                        {user ? (
                            <button className="option" onClick={logout}>
                                LOG OUT
                            </button>
                        ) : (
                            <Link className="option" to="/login">
                                LOG IN
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
            <div className="options"></div>
        </header>
    );
};

export default Header;
