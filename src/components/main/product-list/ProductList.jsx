import AdminPageItem from "../../utility/admin-page-item/AdminPageItem";

import { useState, useEffect } from "react";

import { getAllProducts, editProduct, deleteProduct } from "../../../firebase";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => setProducts(res));
    }, []);

    return (
        <section className="product-list">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.map((item) => (
                            <AdminPageItem
                                key={item.id}
                                id={item.id}
                                items={[item.name, item.price]}
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
