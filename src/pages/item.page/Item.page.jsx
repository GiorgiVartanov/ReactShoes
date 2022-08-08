import "./item.scss";

import Comments from "../../components/main/comments.component/Comments";
import AddToCartButton from "../../components/utility/add-to-cart-button/AddToCartButton";

import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";

import { auth, getItem, addToCart } from "../../firebase";

const ItemPage = () => {
    const [user] = useAuthState(auth);

    const { id } = useParams("id");

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
        <>
            {item ? (
                <main className="item-page">
                    <div className="item-description">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="item-image"
                        />
                        <div className="item-text">
                            <h2 className="item-name">{item.name}</h2>
                            <div className="search-links">
                                <Link
                                    to={`../shop?type=${item.type}`}
                                    className="item-type"
                                >
                                    {item.type}
                                </Link>
                                <Link
                                    to={`../shop?color=${item.color}`}
                                    className="item-color"
                                >
                                    {item.color}
                                </Link>
                            </div>

                            <p className="item-price">{item.price}$</p>
                            <AddToCartButton productId={id} user={user} />
                        </div>
                    </div>
                    <Comments productId={item?.id} user={user} />
                </main>
            ) : (
                ""
            )}
        </>
    );
};

export default ItemPage;