import "./adminPageProductItem.scss";

import { useState } from "react";
import { editProduct, deleteProduct } from "../../../firebase";

import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const AdminPageProductItem = ({ id, name, price, discount }) => {
    const [deleting, setDeleting] = useState(false);

    const [editingData, setEditingData] = useState(false);

    const [productName, setProductName] = useState(name);
    const [productPrice, setProductPrice] = useState(price);
    const [productDiscount, setProductDiscount] = useState(discount);

    const [priceError, setPriceError] = useState(false);
    const [discountError, setDiscountError] = useState(false);

    const handleChangeSubmit = () => {
        let changedPrice = productPrice;
        let changedDiscount = productDiscount;
        if (productPrice.length === 0) {
            changedPrice = 0;
            setProductPrice(0);
        }
        if (productDiscount.length === 0) {
            changedDiscount = 0;
            setProductDiscount(0);
        }
        editProduct(id, productName, changedPrice, changedDiscount);
        setEditingData(false);
    };

    const handleNameChange = (e) => {
        setProductName(e.target.value);
    };
    const handlePriceChange = (e) => {
        if (e.target.value > 0) setProductPrice(e.target.value);

        // if the first char of string is zero
        if (e.target.value[0] == 0)
            setProductPrice(e.target.value.substring(1));

        // if it contains any letters
        if (/[a-zA-Z]/g.test(e.target.value))
            setProductPrice(e.target.value.slice(0, -1));
    };
    const handleDiscountChange = (e) => {
        if (e.target.value >= 0 && e.target.value < 100)
            setProductDiscount(e.target.value);

        // if the first char of string is zero
        if (e.target.value[0] == 0)
            setProductDiscount(e.target.value.substring(1));

        // if it contains any letters
        if (/[a-zA-Z]/g.test(e.target.value))
            setProductDiscount(e.target.value.slice(0, -1));
    };

    const handleDataDelete = () => {
        deleteProduct(id);
        setDeleting(false);
    };

    return (
        <tr className="table-row">
            {editingData ? (
                <>
                    <td>
                        <input
                            name={productName}
                            value={productName}
                            onChange={handleNameChange}
                        />
                    </td>
                    <td>
                        <input
                            name={productPrice}
                            value={productPrice}
                            className={`${
                                priceError ? "edit-input-error" : ""
                            }`}
                            placeholder={0}
                            onChange={handlePriceChange}
                        />
                    </td>
                    <td>
                        <input
                            name={productDiscount}
                            value={productDiscount}
                            className={`${
                                discountError ? "edit-input-error" : ""
                            }`}
                            placeholder={0}
                            onChange={handleDiscountChange}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{productName}</td>
                    <td>{productPrice}</td>
                    <td>{productDiscount}</td>
                </>
            )}

            <td>
                {deleting ? (
                    <button
                        className="confirm-delete-item"
                        onClick={handleDataDelete}
                    >
                        <FaCheck />
                    </button>
                ) : (
                    <button
                        className="delete-item"
                        onClick={() => {
                            setDeleting(true);
                        }}
                    >
                        <FaTrash />
                    </button>
                )}
                {editingData ? (
                    <button
                        className="confirm-item-update"
                        onClick={handleChangeSubmit}
                    >
                        <FaCheck />
                    </button>
                ) : (
                    <button
                        className="edit-item"
                        onClick={() => {
                            setEditingData(true);
                        }}
                    >
                        <FaEdit />
                    </button>
                )}
            </td>
        </tr>
    );
};

export default AdminPageProductItem;
