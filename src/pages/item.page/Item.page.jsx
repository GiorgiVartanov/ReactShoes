import "./item.scss";

import Comments from "../../components/main/comments.component/Comments";

import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";

import { auth, getItem, addToCart } from "../../firebase";

const ItemPage = () => {
    const [user] = useAuthState(auth);

    const { id } = useParams();

    const [item, setItems] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItem(id)
            .then((res) => setItems(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;

    return (
        <main className="item-page">
            <div className="item-description">
                <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="item-image"
                />
                <div className="item-text">
                    <h2 className="item-name">{item?.name}</h2>
                    <p className="item-price">{item?.price}$</p>
                    {user !== null ? (
                        <button
                            className="add-to-cart"
                            onClick={() => {
                                addToCart(item?.id, user);
                            }}
                        >
                            <BsCartPlus />
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            {item?.id ? <Comments productId={item?.id} user={user} /> : ""}
        </main>
    );
};

export default ItemPage;
