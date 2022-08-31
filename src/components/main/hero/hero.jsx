import "./hero.scss";

import Loading from "../../utility/loading/Loading";

import { useState, useEffect } from "react";

const Hero = () => {
    const [data, setDate] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API for getting random quote (on main page)
        // response from this API is stored in cache for 1 hour
        fetch("https://api.goprogram.ai/inspiration")
            .then((response) => response.json())
            .then((response) => setDate(response))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    if (error) return <p>Something Went Wrong</p>;

    return (
        <div className="hero-image">
            {loading ? (
                <Loading />
            ) : (
                <q
                    // font will be smaller if the text is too long
                    className={`hero-text ${
                        data.quote.length > 40 ? "smaller-letters" : ""
                    }`}
                >
                    {/* every word will be in different span */}
                    {data.quote.split(" ").map((word, index) => (
                        <span key={word + index} className="quote">
                            {word}
                        </span>
                    ))}

                    {/* we won't display author name if this quote is anonymous*/}
                    {data.author !== "Anonymous" &&
                    data.author !== "Unknown" ? (
                        <span className="author-name">{data.author}</span>
                    ) : (
                        ""
                    )}
                </q>
            )}
        </div>
    );
};

export default Hero;
