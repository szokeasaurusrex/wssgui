import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup, FormControlLabel, Radio, Typography,
} from '@material-ui/core';
import genUuid from 'uuid/v4';

function SourceSinkSelection({
  sourceSink, setSourceSink, updateValidity, disabled,
}) {
  const uuid = useRef(genUuid());

  useEffect(
    () => updateValidity(uuid.current, sourceSink !== '' || disabled),
    [sourceSink, updateValidity, disabled],
  );

  return (
    <>
      <RadioGroup
        row
        value={sourceSink}
        onChange={event => setSourceSink(event.target.value)}
      >
        { ['source', 'sink'].map(option => (
          <FormControlLabel
            key={option}
            value={option}
            disabled={disabled}
            control={<Radio />}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
          />
        ))}
      </RadioGroup>
      { sourceSink === '' && !disabled && (
        <Typography variant="body2" component="div" color="error">
          Please select source or sink
        </Typography>
      )}
    </>
  );
}

SourceSinkSelection.propTypes = {
  sourceSink: PropTypes.oneOf(['source', 'sink', '']),
  setSourceSink: PropTypes.func.isRequired,
  updateValidity: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

SourceSinkSelection.defaultProps = {
  sourceSink: '',
};

export default SourceSinkSelection;
