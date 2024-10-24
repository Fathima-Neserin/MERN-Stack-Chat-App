import React from 'react';

const GenderCheckBox = ({ gender, handleCheckBoxChange, isChecked }) => {
  return (
    <div className="form-control">
      <label className="ml-2 label gap-2 cursor-pointer">
        <span className="label-text">{gender}</span>
        <input
          type="checkbox"
          className="checkbox border-slate-900"
          checked={isChecked}
          onChange={() => handleCheckBoxChange(gender)}  
        />
      </label>
    </div>
  );
};

export default GenderCheckBox;
