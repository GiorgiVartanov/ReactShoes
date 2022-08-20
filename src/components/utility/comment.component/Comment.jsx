import "./comment.scss";

import { useState, useEffect } from "react";

import { getUser } from "../../../firebase";

const Comment = ({ userId, text, time }) => {
    const [userName, setUserName] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    // calculating days, hours, minutes and seconds from given amount of milliseconds
    const [days, setDays] = useState(Math.floor(time / 1000 / 60 / 60 / 24));
    const [hours, setHours] = useState(Math.floor(time / 1000 / 60 / 60) % 24);
    const [minutes, setMinutes] = useState(Math.floor(time / 1000 / 60) % 60);
    const [seconds, setSeconds] = useState(Math.floor(time / 1000) % 60);

    useEffect(() => {
        getUser(userId)
            .then((res) => setUserName(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>error</p>;

    return (
        <div className="comment">
            {minutes > 0 || hours > 0 || days > 0 ? (
                <p className="comment-time">
                    {/* it will show value only if it is more that zero, 
                so it won't show something like 0 days 0hours 10 minutes ago.
                also it won't show seconds if time from creating of post is
                more than hour*/}
                    {days > 0 ? days + "d " : ""}
                    {hours > 0 ? hours + "h " : ""}
                    {minutes > 0 && days === 0 ? minutes + "m " : ""}
                </p>
            ) : (
                <p className="comment-time">now</p>
            )}
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
