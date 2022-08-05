import Card from "../../components/main/card.component/Card";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getShopPageContent } from "../../firebase";

const Shop = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getShopPageContent()
            .then((res) => setItems(res))
            .catch((err) => setError(err))
            .finally(setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong...</p>;

    return (
        <main>
            <div className="card-holder">
                {items._snapshot?.docChanges.map((item) => (
                    <Card
                        key={item.doc.data.value.mapValue.fields.id.stringValue}
                        id={item.doc.data.value.mapValue.fields.id.stringValue}
                        name={
                            item.doc.data.value.mapValue.fields.name.stringValue
                        }
                        image={
                            item.doc.data.value.mapValue.fields.imageUrl
                                .stringValue
                        }
                        price={
                            item.doc.data.value.mapValue.fields.price
                                .doubleValue
                        }
                    />
                ))}
            </div>
        </main>
    );
};

export default Shop;
