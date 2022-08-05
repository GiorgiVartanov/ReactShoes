import Button from "../../components/utility/button.component/Button";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase";

const LogIn = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

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
            <Button onClick={signInWithGoogle} text={"Log In With Google"} />
        </main>
    );
};

export default LogIn;
