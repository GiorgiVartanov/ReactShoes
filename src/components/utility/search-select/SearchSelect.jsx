import "./searchSelect.scss";

const SearchSelect = ({ name, values, names, onSelect }) => {
    return (
        <label htmlFor={name} className="search-label">
            {name}
            <select
                name={name}
                id={name}
                className="search-select"
                onChange={onSelect}
            >
                {values.map((value, index) => (
                    <option key={value} value={value}>
                        {names[index]}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SearchSelect;
