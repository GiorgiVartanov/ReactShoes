import "./card-placeholder.scss";

const CardPlaceholder = () => {
    // it will be rendered in place of the card until the card data is received
    return (
        <div className="card-placeholder">
            <div className="card-placeholder-image"></div>
            <div className="card-placeholder-text">
                <div className="card-placeholder-name"></div>
                <div className="card-placeholder-price"></div>
            </div>
        </div>
    );
};

export default CardPlaceholder;
