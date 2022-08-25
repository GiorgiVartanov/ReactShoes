import "./card.scss";

import { Link } from "react-router-dom";

import { calculatePrice } from "../../../functions";

const Card = ({ id, image, name, price, author, discount, amount }) => {
    return (
        <Link to={`/buy/${id}`} className="card">
            <div className="card-tooltip">{author}</div>
            {amount ? <p className="item-amount">{amount}</p> : ""}
            <img src={image} alt={name} className="card-image" />
            <div className="card-text">
                <h3 className="card-name">{name}</h3>
                {discount === 0 ? (
                    <p className="card-price">{price}$</p>
                ) : (
                    <div className="discounted-card-price">
                        <div className="old-price">{price}</div>
                        <div className="new-price">
                            {calculatePrice(price, discount)}
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default Card;
