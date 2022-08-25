import "./cart.scss";

import Card from "../../components/main/card.component/Card";

import { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { calculatePrice } from "../../functions";
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
                    (totalPrice += calculatePrice(
                        item.item.price * item.amount,
                        item.item.discount
                    ))
            );
            setTotal(Math.round(totalPrice * 100) / 100);
        }
    }, [cart]);

    if (!user) navigate("/");

    if (loading) return <p className="warning">Loading...</p>;
    if (error) return <p className="warning">Something Went Wrong...</p>;

    return (
        <main className="cart-page">
            <div className="card-holder">
                {cart
                    ? cart.map((item) => {
                          return (
                              <Card
                                  key={item.item.id}
                                  id={item.item.id}
                                  name={item.item.name}
                                  price={item.item.price}
                                  image={item.item.imageUrl}
                                  author={item.item.authorUrl}
                                  discount={item.item.discount}
                                  amount={item.amount}
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
