import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";

const Select = ({
  options = [],
  value = null,
  onChange,
  placeholder = "선택하세요",
  width = "100px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 선택된 옵션의 label 찾기
  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelectOption = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.select_wrapper} ref={dropdownRef} style={{ width }}>
      <div className={styles.select_option} onClick={toggleDropdown}>
        <span
          className={`${styles.select_text} ${
            !selectedOption ? styles.select_text_placeholder : ""
          }`}
        >
          {displayText}
        </span>
        <span
          className={`${styles.select_arrow} ${
            isOpen ? styles.select_arrow_open : ""
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <div className={styles.option_list}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option_item} ${
                value === option.value ? styles.option_item_selected : ""
              }`}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
