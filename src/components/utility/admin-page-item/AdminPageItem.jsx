import "./adminPageItem.scss";

import { useState, useEffect } from "react";

import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const AdminPageItem = ({ id, items, deleteItem, updateItem }) => {
    const [deleting, setDeleting] = useState(false);

    const [editingData, setEditingData] = useState(false);

    const [itemsArr, setItemsArr] = useState([...items]);

    const handleInputChange = (e) => {
        const tempArr = [...itemsArr];
        tempArr[e.target.name] = e.target.value;
        setItemsArr(tempArr);
    };

    const handleDataChange = () => {
        updateItem(id, itemsArr);
        setEditingData(false);
    };

    const handleDataDelete = () => {
        deleteItem(id);
        setDeleting(false);
    };

    return (
        <tr className="table-row">
            {editingData
                ? itemsArr.map((item, index) => (
                      <td key={index}>
                          {/* I don't think that it is a good
                          practice to use index as a key,
                          I will change it later */}
                          <input
                              name={index}
                              value={item}
                              onChange={handleInputChange}
                          />
                      </td>
                  ))
                : itemsArr.map((item) => <td key={item}>{item}</td>)}
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
                        onClick={handleDataChange}
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

export default AdminPageItem;
