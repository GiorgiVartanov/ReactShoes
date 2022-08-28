import "./adminPageUserItem.scss";

import { useState, useRef } from "react";
import { editUser } from "../../../firebase/firebase";
import { FaEdit, FaCheck } from "react-icons/fa";

import { useDetectClickOutside } from "../../../hooks";

const AdminPageUserItem = ({ id, name, email, status }) => {
    const editRef = useRef(null);

    const [editingData, setEditingData] = useState(false);

    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userStatus, setUserStatus] = useState(status);

    useDetectClickOutside(editRef, () => {
        setEditingData(false);
    });

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
                <div className="edit-button-holder" ref={editRef}>
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
                </div>
            </td>
        </tr>
    );
};

export default AdminPageUserItem;
