import React, { useState } from 'react';

const RangeSlider = ({ min, max, step, minDefault, maxDefault, onChange }) => {
  const [minValue, setMinValue] = useState(minDefault || min);
  const [maxValue, setMaxValue] = useState(maxDefault || max);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - step);
    setMinValue(value);
    onChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + step);
    setMaxValue(value);
    onChange({ min: minValue, max: value });
  };

  return (
    <div className="range-slider">
      <div className="range-input">
        <input
          type="range"
          className="min-range"
          min={min}
          max={max}
          value={minValue}
          step={step}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="max-range"
          min={min}
          max={max}
          value={maxValue}
          step={step}
          onChange={handleMaxChange}
        />
      </div>
      <div className="price-input">
        <div className="price-field">
          <span>Min Price: ${minValue}</span>
        </div>
        <div className="price-field">
          <span>Max Price: ${maxValue}</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;