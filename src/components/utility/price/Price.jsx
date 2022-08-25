import "./price.scss";

import { calculatePrice } from "../../../functions";

const Price = ({ price, discount }) => {
    return (
        <div className="item-price-holder">
            {discount > 0 ? (
                <p className="item-old-price">
                    {Math.floor(price * 100) / 100}$
                </p>
            ) : (
                ""
            )}
            <p className="item-price">
                {discount ? calculatePrice(price, discount) : price}$
            </p>
            {discount > 0 ? (
                <p className="item-discount">{discount}% off</p>
            ) : (
                ""
            )}
        </div>
    );
};

export default Price;
