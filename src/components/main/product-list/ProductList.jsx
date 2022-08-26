import AdminPageProductItem from "../../utility/admin-page-product-item/AdminPageProductItem";

import { useState, useEffect } from "react";

import {
    getAllProducts,
    editProduct,
    deleteProduct,
} from "../../../firebase/firebase";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => setProducts(res));
    }, []);

    return (
        <section className="item-list">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>discount</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.map((item) => (
                            <AdminPageProductItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                discount={item.discount}
                                deleteItem={deleteProduct}
                                updateItem={editProduct}
                            />
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default ProductList;
