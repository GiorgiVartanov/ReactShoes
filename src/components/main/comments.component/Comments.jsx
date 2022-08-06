import "./comments.scss";

import Comment from "../../utility/comment.component/Comment";

import { useState, useEffect } from "react";

import { getComments, addComment } from "../../../firebase";

const Comments = ({ productId, user }) => {
    const [newComment, setNewComment] = useState("");

    const [comments, setComments] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getComments(productId)
            .then((res) => setComments(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    const handleSubmit = (e) => {
        if (newComment !== null && productId !== null && user !== null) {
            addComment(newComment, productId, user);

            getComments(productId)
                .then((res) => setComments(res))
                .catch((err) => setError(err))
                .finally(setLoading(false));

            setNewComment("");
        }
    };

    const handleChange = (e) => {
        setNewComment(e.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;

    return (
        <section className="comments">
            {/*need to change key to something else */}
            {comments
                ? comments.map((item, index) => (
                      <Comment
                          key={index}
                          text={item.text}
                          userId={item.userId}
                      />
                  ))
                : ""}
            {user !== null ? (
                <form className="add-comment">
                    <label className="add-comment-label" htmlFor="add-comment">
                        add comment
                    </label>
                    <div className="add-comment-bottom-part">
                        <input
                            className="add-comment-input"
                            type="text"
                            name="add-comment"
                            autoComplete="off"
                            onChange={handleChange}
                            value={newComment}
                        />
                        <button
                            onClick={handleSubmit}
                            className="add-comment-button"
                            type="button"
                        >
                            comment
                        </button>
                    </div>
                </form>
            ) : (
                <p>log in to write a comment...</p>
            )}
        </section>
    );
};

export default Comments;
