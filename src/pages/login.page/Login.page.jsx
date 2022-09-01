import SignInWithGoogleButton from "../../components/utility/sign-in-with-google-button/SignInWithGoogleButton";
import FormInput from "../../components/utility/form-input/FormInput";

import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, logInWithEmailAndPassword } from "../../firebase/firebase";
import { UserContext } from "../../App";

const LogIn = () => {
    const { providerUser } = useContext(UserContext);
    const [user, loading, error] = providerUser;

    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent from default submit action

        setEmail("");
        setPassword("");
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };

    const login = () => {
        const emailErrorArr = [];
        const passwordErrorArr = [];

        if (email === "") emailErrorArr.push("please enter email");
        if (email === "") emailErrorArr.push("please enter an email");
        else {
            if (!email.includes("@") || !email.includes("."))
                emailErrorArr.push("please enter valid email");
        }

        if (password === "") passwordErrorArr.push("please enter password");

        setEmailErrors(emailErrorArr);
        setPasswordErrors(passwordErrorArr);

        if (emailErrorArr.length === 0 && passwordErrorArr.length === 0)
            logInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <main className="sign-in-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h3>Login</h3>
                <FormInput
                    name={"email"}
                    value={email}
                    errors={emailErrors}
                    type={"email"}
                    onChange={handleChange}
                />
                <FormInput
                    name={"password"}
                    value={password}
                    errors={passwordErrors}
                    type={"password"}
                    onChange={handleChange}
                />
                <button className="form-button" onClick={login}>
                    log in
                </button>
                <SignInWithGoogleButton />
                <Link to="/register">
                    Don't have an account yet? Create one
                </Link>
            </form>
        </main>
    );
};

export default LogIn;
