import "./hamburgerButton.scss";

const HamburgerButton = ({ onClick }) => {
    return (
        <button className="hamburger-button" onClick={onClick}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </button>
    );
};

export default HamburgerButton;
