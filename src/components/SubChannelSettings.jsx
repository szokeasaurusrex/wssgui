import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MAX_INTENSITY, MIN_INTENSITY } from '../constants';
import IntegerInput from './IntegerInput';
import SourceSinkSelection from './SourceSinkSelection';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function SubChannelSettings({
  setSubChannel, subChannel, subChannelType,
  updateValidity, channelNum, disabled,
}) {
  const classes = useStyles();

  function handleChange(param, newValue) {
    setSubChannel({
      ...subChannel,
      [param]: newValue,
    });
  }

  return (
    <Grid item md={6} xs={12} className={classes.root}>
      <Typography variant="h6">
        {`Channel ${channelNum + 1} `}
        {subChannelType === 'stim' ? 'stimulation' : 'recharge'}
      </Typography>
      <IntegerInput
        label="Intensity (mA)"
        name="intensity"
        value={subChannel.intensity}
        setValue={newIntensity => handleChange('intensity', newIntensity)}
        disabled={disabled}
        updateValidity={updateValidity}
        maxValue={MAX_INTENSITY}
        minValue={MIN_INTENSITY}
      />
      <SourceSinkSelection
        setSourceSink={newSourceSink => handleChange('sourceSink', newSourceSink)}
        sourceSink={subChannel.sourceSink}
        updateValidity={updateValidity}
        disabled={disabled}
      />
    </Grid>
  );
}

SubChannelSettings.propTypes = {
  setSubChannel: PropTypes.func.isRequired,
  subChannel: PropTypes.shape({
    intensity: IntegerInput.propTypes.value,
    sourceSink: SourceSinkSelection.propTypes.sourceSink,
  }),
  subChannelType: PropTypes.oneOf(['stim', 'rchrg']).isRequired,
  updateValidity: PropTypes.func.isRequired,
  channelNum: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

SubChannelSettings.defaultProps = {
  subChannel: {},
};

export default SubChannelSettings;
