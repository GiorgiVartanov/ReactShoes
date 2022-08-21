import { FaTrash, FaEdit } from "react-icons/fa";

const ProductListItem = ({ name, id, price }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                <button className="delete-item">
                    <FaTrash />
                </button>
                <button className="edit-item">
                    <FaEdit />
                </button>
            </td>
        </tr>
    );
};

export default ProductListItem;
