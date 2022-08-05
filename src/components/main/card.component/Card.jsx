import "./card.scss";

import { Link } from "react-router-dom";

const Card = ({ id, image, name }) => {
    console.log(image);
    return (
        <Link to={`/${id}`} className="card">
            <img src={image} alt={name} className="card-image" />
            <h3 className="card-name">{name}</h3>
        </Link>
    );
};

export default Card;
