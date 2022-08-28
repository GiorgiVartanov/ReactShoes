import "./searchSelect.scss";

const SearchSelect = ({ name, values, onSelect, selected }) => {
    return (
        <label htmlFor={name} className="search-label">
            {name}
            <select
                name={name}
                id={name}
                className="search-select"
                onChange={onSelect}
                defaultValue={selected}
            >
                {selected ? <option value={selected}>{selected}</option> : ""}
                {values
                    .filter((item) => item !== selected)
                    .map((value) => (
                        <option key={value} value={value}>
                            {name === "price" && value !== "Any"
                                ? "under "
                                : ""}
                            {value}
                            {name === "price" && value !== "Any" ? "$" : ""}
                        </option>
                    ))}
            </select>
        </label>
    );
};

export default SearchSelect;
