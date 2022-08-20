import "./adminPageUserItem.scss";

import { useState, useEffect } from "react";
import { editUser, banUser } from "../../../firebase";

import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const AdminPageUserItem = ({ id, name, email, status }) => {
    const [deleting, setDeleting] = useState(false);

    const [editingData, setEditingData] = useState(false);

    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userStatus, setUserStatus] = useState(status);

    const handleChangeSubmit = () => {
        editUser(id, userName, userEmail, userStatus);
        setEditingData(false);
    };

    const handleNameChange = (e) => {
        setUserName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    };
    const handleStatusChange = (e) => {
        setUserStatus(e.target.value);
    };

    const handleDataDelete = () => {
        banUser(id);
        setDeleting(false);
    };

    return (
        <tr className="table-row">
            {editingData ? (
                <>
                    <td>
                        <input
                            name={userName}
                            value={userName}
                            onChange={handleNameChange}
                        />
                    </td>
                    <td>
                        <input
                            name={userEmail}
                            value={userEmail}
                            onChange={handleEmailChange}
                        />
                    </td>
                    <td>
                        <input
                            name={userStatus}
                            value={userStatus}
                            onChange={handleStatusChange}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{userName}</td>
                    <td>{userEmail}</td>
                    <td>{userStatus}</td>
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

export default AdminPageUserItem;
