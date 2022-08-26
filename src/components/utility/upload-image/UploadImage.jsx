import "./uploadImage.scss";
const UploadImage = ({ changeImage, image }) => {
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
            <img
                className="uploaded-image"
                src={image}
                alt={image}
                accept="image/png, image/jpeg"
            />
        </div>
    );
};

export default UploadImage;
