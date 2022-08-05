import Card from "../../components/main/card.component/Card";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getShopPageContent } from "../../firebase";

const Shop = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShopPageContent()
            .then((res) => setItems(res))
            .finally(setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <main>
            <Card
                id={
                    items._snapshot?.docChanges[0].doc.data.value.mapValue
                        .fields.id.stringValue
                }
                name={
                    items._snapshot?.docChanges[0].doc.data.value.mapValue
                        .fields.name.stringValue
                }
                image={
                    items._snapshot?.docChanges[0].doc.data.value.mapValue
                        .fields.imageUrl.stringValue
                }
            />
        </main>
    );
};

export default Shop;
