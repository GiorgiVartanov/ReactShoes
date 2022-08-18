const ProductListItem = ({ name, id, price }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{id}</td>
            <td>{price}</td>
        </tr>
    );
};

export default ProductListItem;
