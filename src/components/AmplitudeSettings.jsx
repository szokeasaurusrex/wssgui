import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ChannelSettings from './ChannelSettings';
import SettingsHeading from './SettingsHeading';
import { NUM_CONFIGURABLE_CHANNELS } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(4),
  },
}));

function AmplitudeSettings({ setAmplitudes, amplitudes, updateValidity }) {
  const [usingDefault, setUsingDefault] = useState(false);

  function handleChannelChange(channelNum, newChannelSettings) {
    // Create copy of amplitudes
    const newAmplitudes = [...amplitudes];

    // Set new settings and update
    newAmplitudes[channelNum] = newChannelSettings;
    setAmplitudes(newAmplitudes);
  }

  useEffect(() => {
    if (usingDefault) {
      setAmplitudes([]);
    }
  }, [usingDefault, setAmplitudes]);

  const classes = useStyles();

  return (
    <Grid
      container
      item
      spacing={3}
      xs={12}
      className={classes.root}
      component={Paper}
      justify="center"
    >
      <SettingsHeading
        usingDefault={usingDefault}
        setUsingDefault={setUsingDefault}
        headingText="Amplitude Settings"
      />
      { Array.from(Array(NUM_CONFIGURABLE_CHANNELS))
        .map((_, channelNum) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={channelNum}>
            { channelNum !== 0 && (
              <Grid item xs={12}>
                <Divider variant="middle" />
              </Grid>
            )}
            <ChannelSettings
              setChannel={
                newSettings => handleChannelChange(channelNum, newSettings)
              }
              channel={amplitudes[channelNum]}
              channelNum={channelNum}
              updateValidity={updateValidity}
              disabled={usingDefault}
            />
          </React.Fragment>
        ))}
    </Grid>
  );
}

AmplitudeSettings.propTypes = {
  setAmplitudes: PropTypes.func.isRequired,
  amplitudes: PropTypes.arrayOf(ChannelSettings.propTypes.channel),
  updateValidity: PropTypes.func.isRequired,
};

AmplitudeSettings.defaultProps = {
  amplitudes: [],
};

export default AmplitudeSettings;
