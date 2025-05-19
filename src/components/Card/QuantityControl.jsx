/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "./styles.css";

const QuantityControl = ({
  id,
  quantity,
  onIncrement,
  onDecrement,
  onChange,
}) => {
  return (
    <div className="flex quantity-control">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={onDecrement}
      >
        -
      </button>
      <input
        type="number"
        className="form-control form-control-sm quantity-input"
        value={quantity}
        onChange={onChange}
        min="1"
      />
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
