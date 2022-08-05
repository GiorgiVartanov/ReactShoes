import Card from "../../components/main/card.component/Card";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, getShopPageContent } from "../../firebase";

const Cart = () => {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (user) {
            getShopPageContent(user)
                .then((res) => setItems(res))
                .finally(console.log(items));
        } else {
            console.log("no user");
        }
    }, [user]);

    if (!user) navigate("/");

    console.log(items);

    return <h1>shop</h1>;
};

export default Cart;
