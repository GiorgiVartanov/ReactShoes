import "./addToCartButton.scss";

import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import { useState, useEffect } from "react";

import {
    addToCart,
    removeFromCart,
    checkIfUserHasThisItem,
} from "../../../firebase/firebase";

const AddToCartButton = ({ productId, user, openModal }) => {
    const [userHas, setUserHas] = useState(false);

    useEffect(() => {
        if (user) {
            checkIfUserHasThisItem(productId, user).then((ans) =>
                setUserHas(ans)
            );
        }
    }, [user, productId]);

    const handleAddToCart = () => {
        addToCart(productId, user); // adding Id of this product to database
        setUserHas(true); // setting state of button manually, so we don't need to refetch
    };

    const handleRemoveFromCart = () => {
        removeFromCart(productId, user);
        setUserHas(false);
    };

    return (
        <>
            {user !== null ? (
                !userHas ? (
                    // change it to closeModal later
                    <button className="add-to-cart" onClick={openModal}>
                        <BsCartPlus />
                    </button>
                ) : (
                    <button className="add-to-cart" onClick={openModal}>
                        <BsCartCheck />
                    </button>
                )
            ) : (
                ""
            )}
        </>
    );
};
export default AddToCartButton;
