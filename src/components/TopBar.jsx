import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/styles/makeStyles';
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
