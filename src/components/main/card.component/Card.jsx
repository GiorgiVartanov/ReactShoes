import "./card.scss";

import { Link } from "react-router-dom";

const Card = ({ id, image, name, price, author }) => {
    return (
        <Link to={`/shop/${id}`} className="card">
            <div className="card-tooltip">{author}</div>
            <img src={image} alt={name} className="card-image" />
            <div className="card-text">
                <h3 className="card-name">{name}</h3>
                <p className="card-price">{price}$</p>
            </div>
        </Link>
    );
};

export default Card;
