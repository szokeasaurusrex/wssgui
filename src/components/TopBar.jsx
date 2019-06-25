import React from 'react';
import PropTypes from 'prop-types';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

function TopBar({ children }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">WSS Config</Typography>
        <div className={classes.grow} />
        { children }
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  children: PropTypes.node,
};

TopBar.defaultProps = {
  children: null,
};

export default TopBar;
