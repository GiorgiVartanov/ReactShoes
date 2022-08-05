import "./item.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCartItems } from "../../firebase";

const ItemPage = () => {
    const { id } = useParams();

    const [item, setItems] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCartItems(id)
            .then((res) => setItems(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
        console.log("123");
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;

    return (
        <main>
            <img src={item?.imageUrl} alt={item?.name} className="item-image" />
            <div className="item-text">
                <h3 className="item-name">{item?.name}</h3>
                <p className="item-price">{item?.price}$</p>
            </div>
        </main>
    );
};

export default ItemPage;
