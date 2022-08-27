import "./comments.scss";

import Comment from "../../utility/comment.component/Comment";

import { useState, useEffect } from "react";

import { getComments, addComment } from "../../../firebase/firebase";

const Comments = ({ productId, user }) => {
    const [newComment, setNewComment] = useState("");
    const [canComment, setCanComment] = useState(false); // it will be set to true if comment contains bad words
    const [submittedComment, setSubmittedComment] = useState("");

    const [comments, setComments] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const [textAreaHeight, setTextAreaHeight] = useState(1);

    useEffect(() => {
        getComments(productId)
            .then((res) => setComments(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    useEffect(() => {
        // checking if comment contains slurs
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

            setSubmittedComment("");
            setNewComment("");
            setCanComment(false);
        } else {
            if (newComment.length > 1) console.log("😠");
            setSubmittedComment("");
            setNewComment("");
        }
    }, [canComment]);

    const handleSubmit = (e) => {
        if (newComment !== null && productId !== null && user !== null) {
            setSubmittedComment(newComment);
        }
    };

    const handleChange = (e) => {
        setNewComment(e.target.value);

        // if text in textArea takes height, that is more than textArea's height
        // we will change textArea's height

        const rowHeight = 24;
        const height = e.target.scrollHeight - rowHeight - 16; // subtracting padding

        const rows = Math.ceil(height / rowHeight);

        console.log(height, rowHeight, rows, textAreaHeight);
        if (rows > textAreaHeight) {
            setTextAreaHeight(rows);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;

    return (
        <section className="comments">
            {comments
                ? comments.map((item) => (
                      <Comment
                          key={item.id}
                          text={item.text}
                          time={new Date() - new Date(item.date)} // it was posted this time age
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
                            rows={textAreaHeight}
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
