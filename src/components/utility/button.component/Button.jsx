import "./button.scss";

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="button">
            {text}
        </button>
    );
};

export default Button;
