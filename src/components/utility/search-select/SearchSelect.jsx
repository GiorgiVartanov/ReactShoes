import "./searchSelect.scss";

const SearchSelect = ({ name, values, onSelect }) => {
    return (
        <label htmlFor={name} className="search-label">
            {name}
            <select
                name={name}
                id={name}
                className="search-select"
                onChange={onSelect}
            >
                {values.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SearchSelect;
