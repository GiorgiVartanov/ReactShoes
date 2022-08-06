import "./comment.scss";

import { useState, useEffect } from "react";

import { getUser } from "../../../firebase";

const Comment = ({ text, userId }) => {
    const [userName, setUserName] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser(userId)
            .then((res) => setUserName(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;

    return (
        <div className="comment">
            {userName !== null ? (
                <p className="comment-writer">{userName}</p>
            ) : (
                ""
            )}
            <p className="comment-text">{text}</p>
        </div>
    );
};

export default Comment;
