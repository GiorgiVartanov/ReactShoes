import { useParams } from "react-router-dom";

const ItemPage = () => {
    const { id } = useParams();

    return <h1>{id}</h1>;
};

export default ItemPage;
