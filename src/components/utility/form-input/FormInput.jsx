import "./formInput.scss";

const FormInput = ({ name, type, value, errors, onChange }) => {
    return (
        <>
            <label
                htmlFor={name}
                className={`${errors.length > 0 ? "input-error" : ""}`}
            >
                <p
                    className={`label-text ${
                        value.length > 0 ? "hidden-label-text" : ""
                    }`}
                >
                    {name}
                </p>
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                />
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
