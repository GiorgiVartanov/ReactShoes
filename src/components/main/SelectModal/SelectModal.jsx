import "./selectModal.scss";

import { useState } from "react";

const SelectModal = ({ opened, openModal }) => {
    const [amount, setAmount] = useState(1);

    return opened ? (
        <div className="select-modal-holder" onClick={openModal}>
            <div className="select-modal">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
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
                </form>
            </div>
        </div>
    ) : (
        ""
    );
};

export default SelectModal;
