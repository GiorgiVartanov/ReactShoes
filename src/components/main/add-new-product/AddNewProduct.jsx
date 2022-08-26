import "./addNewProduct.scss";

import FormInput from "../../utility/form-input/FormInput";
import AddToStorage from "../../utility/add-to-storage/AddToStorage";

import { useState } from "react";

const AddNewProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState("");
    const [imageAuthor, setImageAuthor] = useState("");

    const changeName = (e) => {
        setName(e.target.value);
    };
    const changePrice = (e) => {
        setPrice(e.target.value);
    };
    const changeType = (e) => {
        setType(e.target.value);
    };
    const changeColor = (e) => {
        setColor(e.target.value);
    };
    const changeImage = (e) => {
        setImage(e.target.value);
    };
    const changeImageAuthor = (e) => {
        setImageAuthor(e.target.value);
    };

    return (
        <section className="item-list">
            <form className="add-new-item-form">
                <FormInput
                    name="product name"
                    type="text"
                    value={name}
                    errors={[]}
                    onChange={changeName}
                />
                <FormInput
                    name="price"
                    type="text"
                    value={price}
                    errors={[]}
                    onChange={changePrice}
                />
                <FormInput
                    name="type"
                    type="text"
                    value={type}
                    errors={[]}
                    onChange={changeType}
                />
                <FormInput
                    name="color"
                    type="text"
                    value={color}
                    errors={[]}
                    onChange={changeColor}
                />
                <FormInput
                    name="image"
                    type="text"
                    value={image}
                    errors={[]}
                    onChange={changeImage}
                />
                <AddToStorage
                // name="author of image"
                // type="text"
                // value={imageAuthor}
                // errors={[]}
                // onChange={changeImageAuthor}
                />
            </form>
        </section>
    );
};

export default AddNewProduct;
