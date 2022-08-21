import AdminPageUserItem from "../../utility/admin-page-user-item/AdminPageUserItem";

import { useState, useEffect } from "react";

import { getAllUsers, editUser, banUser } from "../../../firebase";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((res) => setUsers(res));
    }, []);

    return (
        <section className="item-list">
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
                            <AdminPageUserItem
                                key={item.uid}
                                id={item.uid}
                                name={item.name}
                                email={item.email}
                                status={item.status}
                            />
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default UserList;
