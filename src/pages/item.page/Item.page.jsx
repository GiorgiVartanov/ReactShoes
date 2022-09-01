import "./item.scss";

import Comments from "../../components/main/comments/Comments";
import AddToCartButton from "../../components/utility/add-to-cart-button/AddToCartButton";
import ProductPopularityPanel from "../../components/main/product-popularity-panel.component/ProductpopulatiryPanel";
import SelectModal from "../../components/main/select-modal/SelectModal";
import Price from "../../components/utility/price/Price";
import Loading from "../../components/utility/loading/Loading";

import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { getItem } from "../../firebase/firebase";
import { UserContext } from "../../App";

const ItemPage = () => {
    const { providerUser, amount } = useContext(UserContext);

    const [user] = providerUser;

    const { id } = useParams("id");

    const [item, setItems] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const [modalIsOpened, setModalIsOpened] = useState(false);

    const openModal = () => {
        setModalIsOpened(true);
    };
    const closeModal = () => {
        setModalIsOpened(false);
    };

    useEffect(() => {
        getItem(id)
            .then((res) => setItems(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    if (loading) return <Loading />;
    if (error) return <p>error</p>;

    return (
        <>
            {item ? (
                <main className="item-page">
                    {user ? (
                        <SelectModal
                            opened={modalIsOpened}
                            closeModal={closeModal}
                            name={item.name}
                            productId={item.id}
                            price={item.price}
                            discount={item.discount}
                            user={user}
                        />
                    ) : (
                        ""
                    )}
                    <div className="item-description">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="item-image"
                        />

                        <div className="item-text">
                            <h2 className="item-name">{item.name}</h2>
                            <ProductPopularityPanel
                                user={user}
                                productId={item.id}
                            />
                            <div className="search-links">
                                <Link
                                    to={`/?type=${item.type}`}
                                    className="item-type button"
                                >
                                    {item.type}
                                </Link>
                                <Link
                                    to={`/?color=${item.color}`}
                                    className="item-color button"
                                >
                                    {item.color}
                                </Link>
                            </div>

                            <Price
                                price={item.price}
                                discount={item.discount}
                            />

                            <AddToCartButton
                                productId={id}
                                user={user}
                                openModal={openModal}
                            />
                        </div>
                    </div>
                    <Comments productId={item.id} user={user} />
                </main>
            ) : (
                ""
            )}
        </>
    );
};

export default ItemPage;
