import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./GenericFilter.scss";

function GenericFilter({
  data,
  optionAccessor,
  label,
  onFilterChange
}) {
  const [uniqueOptions, setUniqueOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const optionsSet = new Set();
    data.forEach((item) => {
      const options = optionAccessor(item);
      if (Array.isArray(options)) {
        options.forEach((option) => optionsSet.add(option));
      } else if (options) {
        optionsSet.add(options);
      }
    });
    setUniqueOptions([...optionsSet]);
  }, [data, optionAccessor]);

  const handleCheckboxChange = (option) => {
    let updatedSelectedOptions;
    if (selectedOptions.includes(option)) {
      updatedSelectedOptions = selectedOptions.filter((o) => o !== option);
    } else {
      updatedSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedSelectedOptions);
    if (onFilterChange) {
      onFilterChange(updatedSelectedOptions);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="generic-filter">
      <button
        type="button"
        className="dropdown-toggle"
        onClick={toggleDropdown}
      >
        {label}
        {dropdownOpen ? "▲" : "▼"}
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {uniqueOptions.map((option, index) => {
            const checkboxId = `generic-filter-${option}-${index}`;
            return (
              <div key={checkboxId} className="dropdown-item">
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label htmlFor={checkboxId}>{option}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

GenericFilter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionAccessor: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func
};

GenericFilter.defaultProps = {
  onFilterChange: () => {}
};

export default GenericFilter;
