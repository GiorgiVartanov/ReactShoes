import ProductListItem from "../product-list-item/ProductListItem";

import { useState, useEffect } from "react";

import { getAllProducts } from "../../../firebase";

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
                        <th>id</th>
                        <th>price</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products &&
                        products.map((item) => (
                            <ProductListItem
                                key={item.id}
                                name={item.name}
                                id={item.id}
                                price={item.price}
                            />
                        ))}
                </tbody>
            </table>
        </section>
    );
};

export default ProductList;
