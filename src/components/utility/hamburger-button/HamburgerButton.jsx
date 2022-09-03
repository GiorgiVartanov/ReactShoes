import "./hamburgerButton.scss";

const HamburgerButton = ({ onClick, shown, scrolled }) => {
    return (
        <button
            aria-label="hamburger menu" // for more accessibility (screen-readers)
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
