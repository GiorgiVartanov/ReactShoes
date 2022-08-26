import { useState, useEffect } from "react";

import { encodeImageFile } from "../../../functions";

const AddToStorage = () => {
    const [image, setImage] = useState("");

    const handleFileUpload = (e) => {
        encodeImageFile(e.target.files).then((res) => setImage(res));
    };

    useEffect(() => {
        console.log(image);
    }, [image]);

    return (
        <label>
            <input type="file" onChange={handleFileUpload} />
            <img src={image} alt={image} accept="image/png, image/jpeg" />
        </label>
    );
};

export default AddToStorage;
