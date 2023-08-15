import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

type Props = {
  minValue: number,
  maxValue: number,
  min: number, 
  max: number, 
  step: number,
  onChange: Function,
  className?: string,
  type: string
}

const MultiRangeSlider = ({ minValue, maxValue, min, max, step, onChange, className, type }: Props) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<any>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    setMinVal(minValue)
    setMaxVal(maxValue)
    minValRef.current = minValue
    maxValRef.current = maxValue
  }, [minValue, maxValue]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    console.log(minVal, maxVal);
    
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  const onBlur = () => {
    // console.log({ min: minVal, max: maxVal });
    
    // onChange({ min: minVal, max: maxVal });
  }

  return (
    <div className={`container-multi-range-slider ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onBlur={onBlur}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - step);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? "5" : "" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + step);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">
          {
            type == 'price' ? minVal.toLocaleString('vi-VI') + 'đ' : minVal + '%'
          }
        </div>
        <div className="slider__right-value">
          {
            type == 'price' ? maxVal.toLocaleString('vi-VI') + 'đ' : maxVal + '%'
          }
        </div>
      </div>
    </div>
  );
};


export default MultiRangeSlider;
