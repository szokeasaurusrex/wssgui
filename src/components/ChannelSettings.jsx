import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SubChannelSettings from './SubChannelSettings';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function ChannelSettings({
  setChannel, channel, channelNum, updateValidity, disabled,
}) {
  function handleSubChannelChange(subChannelType, newSettings) {
    setChannel({
      ...channel,
      [subChannelType]: newSettings,
    });
  }

  const classes = useStyles();

  return (
    <Grid
      container
      item
      spacing={6}
      xs={12}
      className={classes.root}
      justify="center"
    >
      { ['stim', 'rchrg'].map(subChannelType => (
        <React.Fragment key={subChannelType}>
          <SubChannelSettings
            key={subChannelType}
            setSubChannel={
              newSettings => handleSubChannelChange(subChannelType, newSettings)
            }
            channelNum={channelNum}
            subChannel={channel[subChannelType]}
            subChannelType={subChannelType}
            updateValidity={updateValidity}
            disabled={disabled}
          />
        </React.Fragment>
      ))}
    </Grid>
  );
}

ChannelSettings.propTypes = {
  setChannel: PropTypes.func.isRequired,
  channel: PropTypes.shape({
    stim: SubChannelSettings.propTypes.subChannel,
    rchrg: SubChannelSettings.propTypes.subChannel,
  }),
  channelNum: PropTypes.number.isRequired,
  updateValidity: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

ChannelSettings.defaultProps = {
  channel: {},
};

export default ChannelSettings;
