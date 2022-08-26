import "./signInWithGoogleButton.scss";

import { FaGoogle } from "react-icons/fa";

import { signInWithGoogle } from "../../../firebase/firebase";

const SignInWithGoogleButton = () => {
    return (
        <button
            onClick={signInWithGoogle}
            className="sign-in-with-google-button"
        >
            <FaGoogle />
            Sign in with google
        </button>
    );
};

export default SignInWithGoogleButton;
