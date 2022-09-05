import "./confirmAddToCartButton.scss";

import { BsCartPlus, BsCartCheck, BsCartDash } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";

import {
    addToCart,
    removeFromCart,
    checkIfUserHasThisItem,
} from "../../../firebase/firebase";
import { UserContext } from "../../../App";

const ConfirmAddToCartButton = ({ productId, productAmount, user }) => {
    const { amount, setAmount } = useContext(UserContext);

    const [userHas, setUserHas] = useState(false);

    useEffect(() => {
        if (user) {
            checkIfUserHasThisItem(productId, user).then((ans) =>
                setUserHas(ans)
            );
        }
    }, [user, productId]);

    const handleAddToCart = () => {
        if (!productId) return;
        if (!user) return;

        if (productAmount !== 0) {
            if (!userHas) setAmount(amount + 1);

            addToCart({ id: productId, amount: productAmount }, user); // adding and amount Id of this product to database
            setUserHas(true); // setting state of button manually, so we don't need to refetch
        } else {
            setAmount(amount - 1);
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
                    {/* {userHas ? <BsCartCheck /> : <BsCartPlus />} */}
                    {productAmount > 0 ? <BsCartPlus /> : <BsCartDash />}
                </button>
            ) : (
                ""
            )}
        </>
    );
};
export default ConfirmAddToCartButton;
