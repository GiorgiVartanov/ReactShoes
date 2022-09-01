import "./cart.scss";

import Card from "../../components/main/card/Card";
import CardPlaceholder from "../../components/utility/card-placeholder/CardPlaceholder";
import Loading from "../../components/utility/loading/Loading";

import { useState, useEffect, useRef, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { calculatePrice } from "../../functions";
import { auth, getCart } from "../../firebase/firebase";
import { UserContext } from "../../App";

const Cart = () => {
    const { amount } = useContext(UserContext);

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

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

    if (loading) return <Loading />;
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
                    : // while waiting for data, it will display this placeholders
                      [...Array(amount)].map((item, index) => (
                          <CardPlaceholder key={index} />
                      ))}
                {/* <>
                        
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                    </> */}
            </div>
            <div className="total">Total : {total}$</div>
        </main>
    );
};

export default Cart;
