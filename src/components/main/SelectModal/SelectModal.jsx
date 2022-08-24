import "./selectModal.scss";

import ConfirmAddToCartButton from "../../utility/confirm-add-to-cart-button/ConfirmAddToCartButton";

import { useState } from "react";

const SelectModal = ({ opened, closeModal, name, price, productId, user }) => {
    const [amount, setAmount] = useState(1);

    return opened ? (
        <div
            className="select-modal-holder"
            onClick={(e) => {
                if (e.target.className === "select-modal-holder") closeModal();
            }}
        >
            <div className="select-modal">
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
                                className="select-modal-button"
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
                                }}
                            />
                        </label>
                        <label htmlFor="increase">
                            <button
                                name="increase"
                                className="select-modal-button"
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
                        amount={amount}
                        user={user}
                    />
                </form>
                <p className="price-text">
                    {Math.floor(price * amount * 100) / 100} $
                </p>
            </div>
        </div>
    ) : (
        ""
    );
};

export default SelectModal;
