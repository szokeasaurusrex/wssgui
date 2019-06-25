import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import IntensityInput from './IntensityInput';
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
    <Grid item md={6} className={classes.root}>
      <Typography variant="h6">
        {`Channel ${channelNum + 1} `}
        {subChannelType === 'stim' ? 'stimulation' : 'recharge'}
      </Typography>
      <IntensityInput
        setIntensity={newIntensity => handleChange('intensity', newIntensity)}
        intensity={subChannel.intensity}
        updateValidity={updateValidity}
        disabled={disabled}
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
    intensity: IntensityInput.propTypes.intensity,
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
