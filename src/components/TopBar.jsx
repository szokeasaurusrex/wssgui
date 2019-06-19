import React from 'react';
import PropTypes from 'prop-types';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BuzzerButton from './BuzzerButton';
import WSS from '../serial/WSS';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

function TopBar({ board }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">WSS Config</Typography>
        <div className={classes.grow} />
        <BuzzerButton board={board} />
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
};

export default TopBar;
