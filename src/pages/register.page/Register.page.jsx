import "./register.scss";

import FormInput from "../../components/utility/form-input/FormInput";
import SignInWithGoogleButton from "../../components/utility/sign-in-with-google-button/SignInWithGoogleButton";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase";

const Register = () => {
    const specialSymbols = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
    ];

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const [emailErrors, setEmailErrors] = useState([]);
    const [usernameErrors, setUsernameErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent from default submit action

        if (usernameErrors) setUsername("");
        if (emailErrors) setEmail("");
        if (passwordErrors) setPassword("");
        if (confirmPasswordErrors) setConfirmPassword("");
    };

    const handleChange = (e) => {
        // destructuring e.target to get this 2 values
        const { value, name } = e.target;

        switch (name) {
            case "name":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirm password":
                setConfirmPassword(value);
                break;
        }
    };

    const register = () => {
        const usernameErrorArr = [];
        const emailErrorArr = [];
        const passwordErrorArr = [];
        const confirmPasswordErrorArr = [];

        // username errors

        // checking if username contains special symbol (if contains it's an error)
        if (username === "") {
            usernameErrorArr.push("please enter a username");
        } else {
            if (specialSymbols.some((item) => username.includes(item)))
                usernameErrorArr.push("username contains forbidden symbol");
        }

        // email errors

        if (email === "") emailErrorArr.push("please enter an email");
        else {
            if (!email.includes("@") || !email.includes("."))
                emailErrorArr.push("incorrect email");
        }

        //password errors

        if (password === "") passwordErrorArr.push("please enter a password");
        else {
            if (password.length < 6)
                passwordErrorArr.push("password is too short");
            if (password.length > 30)
                passwordErrorArr.push("password is too long");
            // checking if password contains special symbol (if does not contain it's an error)
            if (!specialSymbols.some((item) => password.includes(item)))
                passwordErrorArr.push(
                    "password needs to have at least one special symbol"
                );
            // checking if password contains at least one number
            if (!/\d/.test(password))
                passwordErrorArr.push(
                    "password needs to contain at least one number"
                );

            // checking if password contains at least ope uppercase letter
            if (password === password.toLowerCase())
                passwordErrorArr.push(
                    "password needs to contain at least one uppercase letter"
                );
        }

        // password confirmation errors

        if (confirmPassword === "")
            confirmPasswordErrorArr("please confirm your password");
        else {
            if (password !== confirmPassword) {
                passwordErrorArr.push("passwords do not match");
                confirmPasswordErrorArr.push("passwords do not match");
            }
        }

        // updating states with this errors
        setEmailErrors(emailErrorArr);
        setPasswordErrors(passwordErrorArr);
        setConfirmPasswordErrors(confirmPasswordErrorArr);

        // register if we don't have ant errors
        if (
            usernameErrorArr.length === 0 &&
            emailErrorArr.length === 0 &&
            passwordErrorArr.length === 0 &&
            confirmPasswordErrorArr.length === 0
        ) {
            registerWithEmailAndPassword(email, username, password);
            console.log(
                `register user with username : ${email} and password : ${password}`
            );
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    return (
        <main className="register-page">
            <form onSubmit={handleSubmit} className="register-form">
                <h3>Register</h3>
                <FormInput
                    name={"name"}
                    value={username}
                    errors={usernameErrors}
                    type={"text"}
                    onChange={handleChange}
                />
                <FormInput
                    name={"email"}
                    value={email}
                    errors={emailErrors}
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
                <FormInput
                    name={"confirm password"}
                    value={confirmPassword}
                    errors={confirmPasswordErrors}
                    type={"password"}
                    onChange={handleChange}
                />
                <button className="form-button" onClick={register}>
                    register
                </button>
                <SignInWithGoogleButton />
                <Link to="/login">Already have an account? Log in</Link>
            </form>
        </main>
    );
};

export default Register;
