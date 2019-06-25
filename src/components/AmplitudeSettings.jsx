import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Divider, Typography,
  FormControlLabel, Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ChannelSettings from './ChannelSettings';
import { NUM_CONFIGURABLE_CHANNELS } from '../constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(2, 0),
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

  function handleToggleDefaultClick() {
    if (usingDefault) {
      setUsingDefault(false);
    } else {
      setUsingDefault(true);
      setAmplitudes([]);
    }
  }

  const classes = useStyles();

  return (
    <Grid container item spacing={3} xs={12} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container item spacing={2} xs={12}>
          <Grid item md xs={12}>
            <Typography variant="h4">Amplitude settings</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={
                <Checkbox checked={usingDefault} onChange={handleToggleDefaultClick} />
              }
              label="Use default settings"
            />
          </Grid>
        </Grid>
        { Array.from(Array(NUM_CONFIGURABLE_CHANNELS))
          .map((_, channelNum) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={channelNum}>
              <Divider className={classes.divider} />
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
      </Paper>
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
