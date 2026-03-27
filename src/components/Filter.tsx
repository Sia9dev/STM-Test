import React, { useState, useRef, useEffect } from "react";
import { Debounce } from "../debounce";
import { FC } from "react";

interface FilterProps {
  onFilter: (text: string) => void;
  onReset: () => void;
}

const Filter: FC<FilterProps> = ({ onFilter, onReset }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedFilter = useRef(
    Debounce((text: string) => onFilter(text), 300),
  );

  useEffect(() => {
    return () => {
      if (debouncedFilter.current) {
        const timer = (debouncedFilter.current as any).timer;
        if (timer) clearTimeout(timer);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFilter.current(value);
  };

  const handleReset = () => {
    setInputValue("");

    const timer = (debouncedFilter.current as any).timer;
    if (timer) clearTimeout(timer);
    onReset();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="поиск"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleReset}>сброс</button>
    </div>
  );
};

export default Filter;
