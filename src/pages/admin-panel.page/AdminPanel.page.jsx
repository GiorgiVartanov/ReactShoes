import "./adminPanel.scss";

import UserList from "../../components/main/user-list/UserList";
import ProductList from "../../components/main/product-list/ProductList";
import SelectTabButton from "../../components/utility/select-tab-button/SelectTabButton";
import AddNewProduct from "../../components/main/add-new-product/AddNewProduct";
import Loading from "../../components/utility/loading/Loading";

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { checkStatus } from "../../firebase/firebase";
import { UserContext } from "../../App";

const AdminPanel = () => {
    const { providerUser } = useContext(UserContext);

    const [user, loading, error] = providerUser;

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

    if (loading) return <Loading />;
    if (error) return <p className="warning">Something Went Wrong</p>;

    return (
        <main className="admin-panel-page">
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
                <SelectTabButton
                    tab="add product"
                    selectedTab={tab}
                    handleTabSelect={handleTabSelect}
                />
            </div>
            {tab === "users" ? <UserList /> : ""}
            {tab === "products" ? <ProductList /> : ""}
            {tab === "add product" ? <AddNewProduct /> : ""}
        </main>
    );
};

export default AdminPanel;
