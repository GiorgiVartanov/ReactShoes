import "./footer.scss";

import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <a
                aria-label="authors github page" // for screen readers
                href="https://github.com/GeorgeGeroge/ReactClothes"
            >
                <AiFillGithub />
            </a>
        </footer>
    );
};

export default Footer;
