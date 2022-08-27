import "./formInput.scss";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const FormInput = ({ name, type, value, errors, onChange }) => {
    const [shown, setShown] = useState(false);

    const handleClick = () => {
        setShown(!shown);
    };

    return (
        <>
            <label
                htmlFor={name}
                className={`register-input-label ${
                    errors.length > 0 ? "input-error" : ""
                }`}
            >
                <p
                    className={`label-text ${
                        value.length > 0 || value > 0 ? "hidden-label-text" : ""
                    }`}
                >
                    {name}
                </p>
                <input
                    type={shown ? "text" : type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && value ? (
                    <button
                        className="show-password"
                        type="button" // by default it would be submit button
                        onClick={handleClick}
                    >
                        {shown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </button>
                ) : (
                    ""
                )}
            </label>
            {errors.length > 0 ? (
                <ul className="error-list">
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            ) : (
                ""
            )}
        </>
    );
};

export default FormInput;
