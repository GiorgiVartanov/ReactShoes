import UserListItem from "../user-list-item/UserListItem";

import { useState, useEffect } from "react";

import { getAllUsers } from "../../../firebase";

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
                        <th>uid</th>
                        <th>email</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((item) => (
                            <UserListItem
                                key={item.uid}
                                name={item.name}
                                uid={item.uid}
                                email={item.email}
                            />
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default UserList;
