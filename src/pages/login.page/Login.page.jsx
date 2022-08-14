import Button from "../../components/utility/button.component/Button";
import SignInWithGoogleButton from "../../components/utility/sign-in-with-google-button/SignInWithGoogleButton";
import FormInput from "../../components/utility/form-input/FormInput";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";

import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase";

const LogIn = () => {
    const [usernameErrors, setUsernameErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        // destructuring e.target to get this 2 values
        const { value, name } = e.target;

        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const login = () => {};

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) navigate("/");
    }, [user, loading]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <main className="sign-in-page">
            <form action="" className="login-form">
                <h3>Login</h3>
                <FormInput
                    name={"username"}
                    value={username}
                    errors={usernameErrors}
                    type={"text"}
                    onChange={handleChange}
                />
                <FormInput
                    name={"password"}
                    value={password}
                    errors={passwordErrors}
                    type={"password"}
                    onChange={handleChange}
                />
                <button className="form-button">log in</button>
                <SignInWithGoogleButton />
                <Link to="/register">
                    Don't have an account yet? Create one
                </Link>
            </form>
        </main>
    );
};

export default LogIn;
