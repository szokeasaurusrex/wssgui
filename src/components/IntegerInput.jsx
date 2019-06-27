import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import genUuid from 'uuid/v4';

function IntegerInput({
  value, setValue, updateValidity, disabled,
  maxValue, minValue, name, label,
}) {
  const [errorMsg, setErrorMsg] = useState('');
  const uuid = useRef(genUuid());

  // Validate intensity input on update
  useEffect(() => {
    if (value === '') {
      setErrorMsg('This field is required');
    } else if (value % 1 !== 0) {
      setErrorMsg('Please enter an integer');
    } else if (minValue != null && value < minValue) {
      setErrorMsg(`The minimum value for ${name} is ${minValue} mA`);
    } else if (maxValue != null && value > maxValue) {
      setErrorMsg(`The maximum value for ${name} is ${maxValue} mA`);
    } else {
      setErrorMsg('');
    }
  }, [value, minValue, maxValue, name]);

  useEffect(
    () => updateValidity(uuid.current, (value !== '' && errorMsg === '') || disabled),
    [value, errorMsg, updateValidity, disabled],
  );

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={event => setValue(event.target.value)}
      error={errorMsg !== '' && !disabled}
      helperText={disabled ? '' : errorMsg}
      disabled={disabled}
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
}

IntegerInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  updateValidity: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

IntegerInput.defaultProps = {
  value: '',
  minValue: null,
  maxValue: null,
  label: '',
};

export default IntegerInput;
