import "./hamburgerButton.scss";

const HamburgerButton = ({ onClick, shown }) => {
    return (
        <button
            className={`hamburger-button ${shown ? "menu-shown" : ""}`}
            onClick={onClick}
        >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </button>
    );
};

export default HamburgerButton;
