import "./hero.scss";
import { useState, useEffect } from "react";

const Hero = () => {
    const [data, setDate] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //response from this API is stored in cache for 1 hour
        fetch("https://api.goprogram.ai/inspiration")
            .then((response) => response.json())
            .then((response) => setDate(response))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <div className="hero-image">
            <h2
                className={`hero-text ${
                    data.quote.length > 40 ? "smaller-letters" : ""
                }`}
            >
                {data.quote.split(" ").map((word, index) => (
                    <span key={word + index} className="quote">
                        {word}
                    </span>
                ))}
                {data.author !== "Anonymous" ? (
                    <span className="author-name">{data.author}</span>
                ) : (
                    ""
                )}
            </h2>
        </div>
    );
};

export default Hero;
