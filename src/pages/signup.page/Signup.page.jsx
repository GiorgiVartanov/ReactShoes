import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent from default submit action

        setEmail("");
        setPassword("");
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "name":
                setName(value);
                break;
        }
    };

    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/userpage");
    }, [user, loading]);

    return (
        <div className="sign-up-page">
            <form onSubmit={handleSubmit}>
                {/* <FormInput
                    name="name"
                    type="text"
                    value={name}
                    label="name"
                    handleChange={handleChange}
                    required
                />
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    label="email"
                    handleChange={handleChange}
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    label="password"
                    handleChange={handleChange}
                    required
                />
                <div className="buttons">
                    <CustomButton onClick={register} type="submit">
                        Sign Up
                    </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                </div> */}
            </form>
        </div>
    );
};

export default SignUp;
