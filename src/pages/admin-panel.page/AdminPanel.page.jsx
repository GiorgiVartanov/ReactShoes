import "./adminPanel.scss";

import AddNewProduct from "../../components/main/add-new-product/AddNewProduct";
import UserList from "../../components/main/user-list/UserList";
import ProductList from "../../components/main/product-list/ProductList";
import SelectTabButton from "../../components/utility/select-tab-button/SelectTabButton";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { checkStatus, auth } from "../../firebase";

const AdminPanel = () => {
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const [tab, setTab] = useState("users");

    useEffect(() => {
        if (user)
            checkStatus(user).then((res) => {
                // if user is logged in, we will check if his status is admin,
                // if not we will redirect user to root
                if (res !== "admin") navigate("/");
            });
    }, [user]);

    const handleTabSelect = (selectedTab) => {
        setTab(selectedTab);
    };

    // if user is not logged in, we will redirect
    if (!user) navigate("/");

    return (
        <main className="add-product-page">
            <AddNewProduct />
            <div className="select-tab-buttons">
                <SelectTabButton
                    tab="users"
                    selectedTab={tab}
                    handleTabSelect={handleTabSelect}
                />
                <SelectTabButton
                    tab="products"
                    selectedTab={tab}
                    handleTabSelect={handleTabSelect}
                />
            </div>
            {tab === "users" ? <UserList /> : ""}
            {tab === "products" ? <ProductList /> : ""}
        </main>
    );
};

export default AdminPanel;
