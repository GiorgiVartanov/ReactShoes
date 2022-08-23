import "./home.scss";

import Card from "../../components/main/card.component/Card";
import SearchSelect from "../../components/utility/search-select/SearchSelect";
import Hero from "../../components/main/hero.component/hero";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getShopPageContent } from "../../firebase";
import { types, colors, prices } from "../../searchOptions";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        type: "Any",
        color: "Any",
        price: "Any",
    });

    const type = searchParams.get("type");
    const color = searchParams.get("color");
    const price = searchParams.get("price");

    const [items, setItems] = useState([]);
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

    if (loading) return <p className="warning">Loading...</p>;
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
                <div className="card-holder">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <Card
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.imageUrl}
                                price={item.price}
                                author={item.authorUrl}
                                discount={item.discount}
                            />
                        ))
                    ) : (
                        <p>There Are No Items For Such Search Orders</p>
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
