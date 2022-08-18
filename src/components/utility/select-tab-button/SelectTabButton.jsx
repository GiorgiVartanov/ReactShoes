import "./selectTabButton.scss";

const SelectTabButton = ({ tab, selectedTab, handleTabSelect }) => {
    return (
        <button
            className={`select-tab-button ${
                selectedTab === tab ? "selected-select-tab-button" : ""
            }`}
            onClick={() => {
                handleTabSelect(tab);
            }}
        >
            {tab}
        </button>
    );
};

export default SelectTabButton;
