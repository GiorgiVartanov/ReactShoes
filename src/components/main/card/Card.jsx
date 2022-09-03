import "./card.scss";

import { Link } from "react-router-dom";

import { calculatePrice } from "../../../functions";

const Card = ({ id, image, name, price, author, discount, amount }) => {
    return (
        <Link to={`/buy/${id}`} className="card">
            <div className="card-tooltip">{author}</div>
            {/* this component will be shown only if amount variable was passed (it is passed only on a cart page) */}
            {amount ? <p className="item-amount">x{amount}</p> : ""}
            <img src={image} alt={name} className="card-image" />
            <div className="card-text">
                <p className="card-name">{name}</p>
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
