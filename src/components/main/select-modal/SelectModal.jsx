import "./selectModal.scss";

import ConfirmAddToCartButton from "../../utility/confirm-add-to-cart-button/ConfirmAddToCartButton";
import Price from "../../utility/price/Price";

import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";

import { calculatePrice } from "../../../functions";
import { getAmountOfItemInCart } from "../../../firebase/firebase";

const SelectModal = ({
    opened,
    closeModal,
    name,
    price,
    productId,
    discount,
    user,
}) => {
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        // getting amount of this item in user's cart from database
        getAmountOfItemInCart(productId, user).then((res) => setAmount(res));
    }, []);

    return opened ? (
        <div
            className="select-modal-holder"
            onClick={(e) => {
                if (e.target.className === "select-modal-holder") closeModal();
            }}
        >
            <div className="select-modal">
                <button className="close-modal-button" onClick={closeModal}>
                    <ImCross />
                </button>
                <h3>{name}</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="select-modal-form-upper-part">
                        <label htmlFor="decrease">
                            <button
                                name="decrease"
                                className="select-modal-button button"
                                onClick={() => {
                                    if (amount > 0) setAmount(amount - 1);
                                }}
                            >
                                -
                            </button>
                        </label>
                        <label htmlFor="amount">
                            <input
                                name="amount"
                                className="select-modal-input"
                                type="text"
                                value={amount}
                                onChange={(e) => {
                                    if (
                                        e.target.value >= 0 &&
                                        !isNaN(e.target.value)
                                    )
                                        setAmount(parseInt(e.target.value));
                                    if (e.target.value === "") setAmount(0);
                                }}
                            />
                        </label>
                        <label htmlFor="increase">
                            <button
                                name="increase"
                                className="select-modal-button button"
                                onClick={() => {
                                    setAmount(parseInt(amount) + 1);
                                }}
                            >
                                +
                            </button>
                        </label>
                    </div>

                    <ConfirmAddToCartButton
                        productId={productId}
                        productAmount={amount}
                        user={user}
                    />
                </form>
                <Price price={price * amount} discount={discount} />
            </div>
        </div>
    ) : (
        ""
    );
};

export default SelectModal;
