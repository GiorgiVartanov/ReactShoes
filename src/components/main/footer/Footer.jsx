import "./footer.scss";

import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <a
                aria-label="authors github page" // for screen readers
                href="https://github.com/GeorgeVRT/ReactShoes"
            >
                <AiFillGithub />
            </a>
        </footer>
    );
};

export default Footer;
