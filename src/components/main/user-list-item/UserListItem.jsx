import { useState, useEffect } from "react";

import { FaTrash, FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const UserListItem = ({ name, email }) => {
    const [deleting, setDeleting] = useState(false);

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {deleting ? (
                    <button>
                        <GiConfirmed />
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
                <button className="edit-item">
                    <FaEdit />
                </button>
            </td>
        </tr>
    );
};

export default UserListItem;
