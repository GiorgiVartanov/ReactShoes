import "./confirmAddToCartButton.scss";

import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import { useState, useEffect } from "react";

import {
    addToCart,
    removeFromCart,
    checkIfUserHasThisItem,
} from "../../../firebase/firebase";

const ConfirmAddToCartButton = ({ productId, amount, user }) => {
    const [userHas, setUserHas] = useState(false);

    useEffect(() => {
        if (user) {
            checkIfUserHasThisItem(productId, user).then((ans) =>
                setUserHas(ans)
            );
        }
    }, [user, productId]);

    const handleAddToCart = () => {
        if (productId && user)
            if (amount !== 0) {
                addToCart({ id: productId, amount: amount }, user); // adding and amount Id of this product to database
                setUserHas(true); // setting state of button manually, so we don't need to refetch
            } else {
                removeFromCart(productId, user);
                setUserHas(false);
            }
    };

    return (
        <>
            {user !== null ? (
                <button
                    className="confirm-to-add-button button"
                    onClick={handleAddToCart}
                >
                    {userHas ? <BsCartCheck /> : <BsCartPlus />}
                </button>
            ) : (
                ""
            )}
        </>
    );
};
export default ConfirmAddToCartButton;
