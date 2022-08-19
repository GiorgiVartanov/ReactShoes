import UserListItem from "../user-list-item/UserListItem";
import AdminPageItem from "../../utility/admin-page-item/AdminPageItem";

import { useState, useEffect } from "react";

import { getAllUsers, editUser, banUser } from "../../../firebase";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((res) => setUsers(res));
    }, []);

    return (
        <section className="user-list">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>status</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((item) => (
                            <AdminPageItem
                                key={item.uid}
                                id={item.uid}
                                items={[item.name, item.email, item.status]}
                                deleteItem={banUser}
                                updateItem={editUser}
                            />
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default UserList;
