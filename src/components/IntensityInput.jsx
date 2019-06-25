import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import genUuid from 'uuid/v4';
import { MIN_INTENSITY, MAX_INTENSITY } from '../constants';

function IntensityInput({
  intensity, setIntensity, updateValidity, disabled,
}) {
  const [errorMsg, setErrorMsg] = useState('');
  const uuid = useRef(genUuid());

  // Validate intensity input on update
  useEffect(() => {
    if (intensity === '') {
      setErrorMsg('This field is required');
    } else if (intensity % 1 !== 0) {
      setErrorMsg('Please enter an integer');
    } else if (intensity < MIN_INTENSITY) {
      setErrorMsg(`The minimum value for intensity is ${MIN_INTENSITY} mA`);
    } else if (intensity > MAX_INTENSITY) {
      setErrorMsg(`The maximum value for intensity is ${MAX_INTENSITY} mA`);
    } else {
      setErrorMsg('');
    }
  }, [intensity]);

  useEffect(
    () => updateValidity(uuid.current, (intensity !== '' && errorMsg === '') || disabled),
    [intensity, errorMsg, updateValidity, disabled],
  );

  return (
    <TextField
      label="Intensity (mA)"
      type="number"
      value={intensity}
      onChange={event => setIntensity(event.target.value, 10)}
      error={errorMsg !== '' && !disabled}
      helperText={disabled ? '' : errorMsg}
      disabled={disabled}
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
}

IntensityInput.propTypes = {
  intensity: PropTypes.string,
  setIntensity: PropTypes.func.isRequired,
  updateValidity: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

IntensityInput.defaultProps = {
  intensity: '',
};

export default IntensityInput;
