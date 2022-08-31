import "./uploadImage.scss";

import image from "../../../assets/default-image-bg.png";

const UploadImage = ({ changeImage, itemImage }) => {
    return (
        <div className="upload-image-label-holder">
            <label className="upload-image-label">
                <p className="upload-image-text">select image</p>
                <input
                    className="image-select-input"
                    type="file"
                    onChange={changeImage}
                />
            </label>
            {itemImage ? (
                <img
                    className="uploaded-image"
                    src={itemImage}
                    alt="no image"
                    accept="image/png, image/jpeg"
                />
            ) : (
                <img
                    className="uploaded-image"
                    src={image}
                    alt="no image"
                    accept="image/png, image/jpeg"
                />
            )}
        </div>
    );
};

export default UploadImage;
