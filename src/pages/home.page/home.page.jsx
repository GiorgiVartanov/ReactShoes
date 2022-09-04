import "./home.scss";

import Card from "../../components/utility/card/Card";
import SearchSelect from "../../components/utility/search-select/SearchSelect";
import Hero from "../../components/main/hero/hero";
import Loading from "../../components/utility/loading/Loading";
import CardPlaceholder from "../../components/utility/card-placeholder/CardPlaceholder";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getShopPageContent } from "../../firebase/firebase";
import { types, colors, prices } from "../../searchOptions";

const Home = () => {
    // default search params
    const [searchParams, setSearchParams] = useSearchParams({
        type: "Any",
        color: "Any",
        price: "Any",
    });

    const type = searchParams.get("type");
    const color = searchParams.get("color");
    const price = searchParams.get("price");

    const [items, setItems] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShopPageContent(type, color, price)
            .then((res) => setItems(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, [type, color, price]);

    const handleTypeSelect = (e) => {
        setSearchParams({
            type: e.target.children[e.target.selectedIndex].value,
            color: color,
            price: price,
        });
    };
    const handleColorSelect = (e) => {
        setSearchParams({
            type: type,
            color: e.target.children[e.target.selectedIndex].value,
            price: price,
        });
    };
    const handlePriceSelect = (e) => {
        setSearchParams({
            type: type,
            color: color,
            price: e.target.children[e.target.selectedIndex].value,
        });
    };

    if (loading) return; // <Loading />;
    if (error)
        return (
            <p className="warning">Something Went Wrong... {error.message}</p>
        );

    return (
        <>
            <Hero />
            <main className="shop-page">
                <div className="search-options">
                    <SearchSelect
                        name="type"
                        values={types}
                        onSelect={handleTypeSelect}
                        selected={type}
                    />
                    <SearchSelect
                        name="color"
                        values={colors}
                        onSelect={handleColorSelect}
                        selected={color}
                    />
                    <SearchSelect
                        name="price"
                        values={prices}
                        onSelect={handlePriceSelect}
                        selected={price}
                    />
                </div>

                {items ? (
                    // checking if at least one item matches the search request
                    items.length > 0 ? (
                        <div className="card-holder">
                            {items.map((item) => (
                                <Card
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    image={item.imageUrl}
                                    price={item.price}
                                    author={item.authorUrl}
                                    discount={item.discount}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="centered-text">
                            There are no items for such search requests
                        </p>
                    )
                ) : (
                    // while waiting for data, it will display this placeholders
                    <div className="card-holder">
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                    </div>
                )}
            </main>
        </>
    );
};

export default Home;
