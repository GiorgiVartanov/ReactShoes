import "./comments.scss";

import Comment from "../../utility/comment.component/Comment";

import { useState, useEffect } from "react";

import { getComments, addComment } from "../../../firebase";

const Comments = ({ productId, user }) => {
    const [newComment, setNewComment] = useState("");
    const [canComment, setCanComment] = useState(false); // it will be set to true if comment contains swears
    const [submittedComment, setSubmittedComment] = useState("");
    // const [fixedNewComment, setFixedNewComment] = useState("");

    const [comments, setComments] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getComments(productId)
            .then((res) => setComments(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    useEffect(() => {
        if (submittedComment) {
            fetch(
                `https://www.purgomalum.com/service/containsprofanity?text=${submittedComment}`
            )
                .then((res) => res.json())
                .then((res) => setCanComment(!res))
                .catch((err) => console.log(err));
        }
    }, [submittedComment]);

    useEffect(() => {
        if (canComment) {
            addComment(newComment, productId, user);

            getComments(productId) // we are refetching api after adding new comment, it's not the best way, will change it later
                .then((res) => setComments(res))
                .catch((err) => setError(err))
                .finally(setLoading(false));

            setNewComment("");
        } else {
            if (newComment.length > 1) console.log("😠");
            setNewComment("");
        }
    }, [canComment]);

    const handleSubmit = (e) => {
        if (newComment !== null && productId !== null && user !== null) {
            setSubmittedComment(newComment);
            // addComment(newComment, productId, user);

            // console.log(fixedNewComment);

            // getComments(productId) // we are refetching api after adding new comment, it's not the best way, will change it later
            //     .then((res) => setComments(res))
            //     .catch((err) => setError(err))
            //     .finally(setLoading(false));

            // setNewComment("");
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
                        <textarea
                            className="add-comment-input"
                            type="text"
                            name="add-comment"
                            autoComplete="off"
                            onChange={handleChange}
                            value={newComment}
                        />
                        <button // not sure
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
