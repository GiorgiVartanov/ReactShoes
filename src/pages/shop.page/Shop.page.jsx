import "./shop.scss";

import Card from "../../components/main/card.component/Card";
import SearchSelect from "../../components/utility/search-select/SearchSelect";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getShopPageContent } from "../../firebase";
import { types, colors } from "../../searchOptions";

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        type: "Any",
        color: "Any",
    });

    const id = searchParams.get("id");
    const type = searchParams.get("type");
    const color = searchParams.get("color");

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShopPageContent(type, color)
            .then((res) => setItems(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, [type, color]);

    useEffect(() => {
        if (id !== null) {
            navigate(`../shop/${id}`, { replace: true });
            // because of {replace : true} when we press on go back
            // arrow we are not redirected to the same page
        }
    }, [id]);

    // useEffect(() => {
    //     console.log(type, color);
    // }, [type, color]);

    const handleTypeSelect = (e) => {
        setSearchParams({
            type: e.target.children[e.target.selectedIndex].value,
            color: color,
        });
    };
    const handleColorSelect = (e) => {
        setSearchParams({
            type: type,
            color: e.target.children[e.target.selectedIndex].value,
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong...</p>;

    return (
        <main>
            <div className="search-options">
                <SearchSelect
                    name="type"
                    values={types}
                    onSelect={handleTypeSelect}
                />
                <SearchSelect
                    name="color"
                    values={colors}
                    onSelect={handleColorSelect}
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
                        />
                    ))
                ) : (
                    <p>There Are No Items For Such Search Orders</p>
                )}
            </div>
        </main>
    );
};

export default Shop;
