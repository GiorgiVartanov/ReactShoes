import "./productPopularityPanel.scss";

import { useState, useEffect } from "react";
import { IoHeart, IoHeartOutline, IoHeartDislike } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";

import {
    getViews,
    getLikes,
    addView,
    addLike,
    checkIfUserHasLiked,
    removeLike,
} from "../../../firebase";

const ProductPopularityPanel = ({ user, productId }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState();
    const [views, setViews] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (user) {
            addView(productId, user);

            checkIfUserHasLiked(productId, user)
                .then((res) => setHasLiked(res))
                .catch((err) => setError(err))
                .finally(setLoading(false));
        }

        getLikes(productId)
            .then((res) => setLikes(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));

        getViews(productId)
            .then((res) => setViews(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, [user, productId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong...</p>;

    return (
        <div className="product-popularity-panel">
            <div
                className={`panel-holder  ${
                    user ? "" : "unlogined-user-like-button"
                }`}
            >
                <button
                    name="like-button"
                    onMouseEnter={() => {
                        setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                    }}
                    className={"like-button"}
                    onClick={() => {
                        if (user !== null) {
                            // we are checking if user is logged in
                            if (hasLiked) {
                                removeLike(productId, user);
                                // removing 1 like from this product, and removing
                                // this productID from this user liked items array

                                setHasLiked(!hasLiked);
                                // we could refetch, but it is more efficient to update it here

                                setLikes(likes - 1);
                            } else {
                                addLike(productId, user);
                                setHasLiked(!hasLiked);
                                setLikes(likes + 1);
                            }
                            // setHasLiked(!hasLiked);
                            // we could remove this line from if/else and write it here
                            // but I thought it would be easier to read that way
                        }
                    }}
                >
                    {hasLiked ? (
                        isHovered ? (
                            <IoHeartDislike />
                        ) : (
                            <IoHeart />
                        )
                    ) : (
                        <IoHeartOutline />
                    )}
                </button>
                {user === null ? (
                    <div className="like-button-tooltip">
                        Log in to like this product
                    </div>
                ) : (
                    ""
                )}
                <p>{likes}</p>
            </div>
            <div className="panel-holder views-icon">
                <AiOutlineEye />
                <p>{views}</p>
            </div>
        </div>
    );
};

export default ProductPopularityPanel;
