const UserListItem = ({ name, email, uid }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{uid}</td>
            <td>{email}</td>
        </tr>
    );
};

export default UserListItem;
