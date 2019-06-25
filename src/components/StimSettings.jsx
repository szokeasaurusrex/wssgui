import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import AmplitudeSettings from './AmplitudeSettings';
import StartStimButton from './StartStimButton';
import WSS from '../serial/WSS';

function StimSettings({ board, boardIsOpen }) {
  const [stimParams, setStimParams] = useState({});
  const [inputValidities, setInputValidities] = useState({});

  function handleParamChange(param, newValue) {
    setStimParams({
      ...stimParams,
      [param]: newValue,
    });
  }

  const updateValidity = useCallback((inputUuid, validity) => {
    setInputValidities(prevInputValidities => ({
      ...prevInputValidities,
      [inputUuid]: validity,
    }));
  }, []);

  function handleStartStimClick() {
    board.startStim(stimParams);
  }

  return (
    <Grid container spacing={3}>
      <AmplitudeSettings
        setAmplitudes={newAmplitudes => handleParamChange('amplitudes', newAmplitudes)}
        amplitudes={stimParams.amplitudes === 'default' ? [] : stimParams.amplitudes}
        updateValidity={updateValidity}
      />
      <StartStimButton
        handleClick={handleStartStimClick}
        disabled={!boardIsOpen || Object.values(inputValidities).includes(false)}
      />
    </Grid>
  );
}

StimSettings.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
  boardIsOpen: PropTypes.bool.isRequired,
};

export default StimSettings;
