import "./comment.scss";

import { useState, useEffect } from "react";

import { getUser } from "../../../firebase";

const Comment = ({ userId, text, time }) => {
    const [userName, setUserName] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const [days, setDays] = useState(Math.floor(time / 1000 / 60 / 60 / 24));
    const [hours, setHours] = useState(Math.floor(time / 1000 / 60 / 60) % 24);
    const [minutes, setMinutes] = useState(Math.floor(time / 1000 / 60) % 60);
    const [seconds, setSeconds] = useState(Math.floor(time / 1000) % 60);

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
            <p className="comment-time">
                {days > 0 ? days + "d " : ""}
                {hours > 0 ? hours + "h " : ""}
                {minutes > 0 ? minutes + "m " : ""}
                {seconds > 0 ? seconds + "s " : ""}
            </p>
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
