import "./adminPageProductItem.scss";

import { useState, useRef } from "react";
import { editProduct, deleteProduct } from "../../../firebase/firebase";

import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

import { useDetectClickOutside } from "../../../hooks";

const AdminPageProductItem = ({ id, name, price, discount }) => {
    const delRed = useRef(null);
    const editRef = useRef(null);

    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const [editingData, setEditingData] = useState(false);

    const [productName, setProductName] = useState(name);
    const [productPrice, setProductPrice] = useState(price);
    const [productDiscount, setProductDiscount] = useState(discount);

    useDetectClickOutside(delRed, () => {
        setDeleting(false);
    });

    useDetectClickOutside(editRef, () => {
        setEditingData(false);
    });

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
        const value = e.target.value;

        if (/^\d+(\.\d{0,2})?$/.test(value) || value === "") {
            if (value === "") setProductPrice("");
            else setProductPrice(value);
        }
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
        setDeleted(true);
        console.log("deleted");
    };

    return (
        <tr
            className={`table-row ${deleted ? "deleted-row" : ""} ${
                deleting ? "almost-deleted-row" : ""
            }`}
        >
            {editingData ? (
                <>
                    <td>
                        <input
                            name={"name"}
                            value={productName}
                            onChange={handleNameChange}
                        />
                    </td>
                    <td>
                        <input
                            name={"price"}
                            value={productPrice}
                            placeholder={0}
                            onChange={handlePriceChange}
                        />
                    </td>
                    <td>
                        <input
                            name={"discount"}
                            value={productDiscount}
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
                        ref={delRed}
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
                <span className="edit-button-holder" ref={editRef}>
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
                </span>
            </td>
        </tr>
    );
};

export default AdminPageProductItem;
