import "./adminPageUserItem.scss";

import SearchSelect from "../search-select/SearchSelect";

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
        // if clicked outside we will restore default values
        setUserName(name);
        setUserEmail(email);
        setUserStatus(status);
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
        <tr className="table-row" ref={editRef}>
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
                        {/* <input
                            name={userStatus}
                            value={userStatus}
                            onChange={handleStatusChange}
                        /> */}
                        <SearchSelect
                            name=""
                            values={["admin", "user"]}
                            onSelect={handleStatusChange}
                            selected={userStatus}
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
                <div className="edit-button-holder">
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
