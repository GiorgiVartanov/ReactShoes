import "./hamburgerButton.scss";

const HamburgerButton = ({ onClick, shown, scrolled }) => {
    return (
        <button
            name="hamburger menu"
            className={`hamburger-button ${shown ? "menu-shown" : ""} ${
                scrolled ? "menu-scrolled" : ""
            }`}
            onClick={onClick}
        >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </button>
    );
};

export default HamburgerButton;
