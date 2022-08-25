import "./adminPageUserItem.scss";

import { useState } from "react";
import { editUser } from "../../../firebase";

import { FaEdit, FaCheck } from "react-icons/fa";

const AdminPageUserItem = ({ id, name, email, status }) => {
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
