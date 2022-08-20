import "./cart.scss";

import Card from "../../components/main/card.component/Card";

import { useState, useEffect, useRef } from "react";
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

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user) {
            getCart(user)
                .then((res) => setCart(res))
                .catch((err) => setError(err))
                .finally(setLoading(false));
        }
    }, [user]);

    useEffect(() => {
        if (cart) {
            let totalPrice = 0;
            cart.map(
                (item) =>
                    (totalPrice +=
                        item.price - (item.price * item.discount) / 100)
            );
            setTotal(Math.round(totalPrice * 100) / 100);
        }
    }, [cart]);

    if (!user) navigate("/");

    if (loading) return <p className="warning">Loading...</p>;
    if (error) return <p className="warning">Something Went Wrong...</p>;

    return (
        <main>
            <div className="card-holder">
                {cart
                    ? cart.map((item) => {
                          return (
                              <Card
                                  key={item.id}
                                  id={item.id}
                                  name={item.name}
                                  price={item.price}
                                  image={item.imageUrl}
                                  author={item.authorUrl}
                                  discount={item.discount}
                              />
                          );
                      })
                    : ""}
            </div>
            <div className="total">Total : {total}$</div>
        </main>
    );
};

export default Cart;
