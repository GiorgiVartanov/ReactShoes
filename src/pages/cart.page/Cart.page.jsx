import Card from "../../components/main/card.component/Card";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, getCart } from "../../firebase";

const Cart = () => {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const [name, setName] = useState("");

    const [cart, setCart] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getCart(user)
                .then((res) => setCart(res))
                .catch((err) => setError(err))
                .finally(setLoading(false));
        }
    }, [user]);

    if (!user) navigate("/");

    if (loading) return <p className="warning">Loading...</p>;
    if (error) return <p className="warning">Something Went Wrong...</p>;

    return (
        <main>
            <div className="card-holder">
                {cart
                    ? cart.map((item) => (
                          <Card
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              price={item.price}
                              image={item.imageUrl}
                              author={item.authorUrl}
                          />
                      ))
                    : ""}
            </div>
        </main>
    );
};

export default Cart;
