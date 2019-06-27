import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import IntegerInput from './IntegerInput';
import SettingsHeading from './SettingsHeading';
import {
  MIN_STIM_PW, MAX_STIM_PW, MIN_INTERPULSE_DELAY,
  MAX_INTERPULSE_DELAY, MIN_RCHRG_PW, MAX_RCHRG_PW,
  MIN_PULSE_PERIOD, MAX_PULSE_PERIOD,
} from '../constants';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    flexGrow: 1,
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
  gridItem: {
    flexGrow: 1,
  },
}));

function TimingsSettings({ setTimings, timings, updateValidity }) {
  const [usingDefault, setUsingDefualt] = useState(false);

  useEffect(() => {
    if (usingDefault) {
      setTimings({});
    }
  }, [usingDefault, setTimings]);

  function handleChange(param, newValue) {
    setTimings({
      ...timings,
      [param]: newValue,
    });
  }

  const classes = useStyles();

  return (
    <Grid
      container
      item
      spacing={6}
      xs={12}
      className={classes.gridContainer}
      component={Paper}
    >
      <SettingsHeading
        usingDefault={usingDefault}
        setUsingDefault={setUsingDefualt}
        headingText="Timing Settings"
      />
      <Grid item md={6} xs={12}>
        <IntegerInput
          label="Stimulation pulsewidth (μs)"
          name="stimulation pulsewidth"
          value={timings.stimPW}
          setValue={newStimPW => handleChange('stimPW', newStimPW)}
          updateValidity={updateValidity}
          disabled={usingDefault}
          minValue={MIN_STIM_PW}
          maxValue={MAX_STIM_PW}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <IntegerInput
          label="Interpulse delay (μs)"
          name="interpulse delay"
          value={timings.interpulseDelay}
          setValue={newInterpulseDelay => handleChange('interpulseDelay', newInterpulseDelay)}
          updateValidity={updateValidity}
          disabled={usingDefault}
          minValue={MIN_INTERPULSE_DELAY}
          maxValue={MAX_INTERPULSE_DELAY}
        />
      </Grid>
      <Grid item md={6} xs={12} className={classes.gridItem}>
        <IntegerInput
          label="Recharge pulsewidth (μs)"
          name="recharge pulsewidth"
          value={timings.rchrgPW}
          setValue={newRchrgPW => handleChange('rchrgPW', newRchrgPW)}
          updateValidity={updateValidity}
          disabled={usingDefault}
          minValue={MIN_RCHRG_PW}
          maxValue={MAX_RCHRG_PW}
        />
      </Grid>
      <Grid item md={6} xs={12} className={classes.gridItem}>
        <IntegerInput
          label="Pulse period (ms)"
          name="pulse period"
          value={timings.pulsePeriod}
          setValue={newPulsePeriod => handleChange('pulsePeriod', newPulsePeriod)}
          updateValidity={updateValidity}
          disabled={usingDefault}
          minValue={MIN_PULSE_PERIOD}
          maxValue={MAX_PULSE_PERIOD}
        />
      </Grid>
    </Grid>
  );
}

TimingsSettings.propTypes = {
  setTimings: PropTypes.func.isRequired,
  timings: PropTypes.shape({
    stimPW: IntegerInput.propTypes.value,
    interpulseDelay: IntegerInput.propTypes.value,
    rchrgPW: IntegerInput.propTypes.value,
    pulsePeriod: IntegerInput.propTypes.value,
  }),
  updateValidity: PropTypes.func.isRequired,
};

TimingsSettings.defaultProps = {
  timings: {},
};

export default TimingsSettings;
