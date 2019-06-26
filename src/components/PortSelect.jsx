import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, MenuItem, IconButton, Grid,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/styles';
import WSS from '../serial/WSS';

const useStyles = makeStyles(theme => ({
  input: {
    minWidth: 200,
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}));

function PortSelect({ board }) {
  const classes = useStyles();
  const [selectedPort, setPortSelection] = useState('');
  const [ports, setPorts] = useState([]);
  const [error, setError] = useState(false);

  async function updatePorts() {
    setPorts(await WSS.listPorts());
  }

  const openListener = useCallback(() => {
    setPortSelection(board.getPortName());
    setError(false);
  }, [board]);

  const errorListener = useCallback(() => {
    setPortSelection('');
    setError(true);
    updatePorts();
  }, []);


  useEffect(() => {
    // Get port names when component mounts
    updatePorts();
  }, []);

  useEffect(() => {
    // Add listeners
    board.on('open', openListener);
    board.on('error', errorListener);

    return () => {
      // Remove listeners on unmount
      board.off('open', openListener);
      board.off('error', errorListener);
    };
  }, [board, openListener, errorListener]);


  function handleChange(event) {
    board.setPortName(event.target.value);
  }

  async function handleRefreshClick() {
    setPorts(await board.openFirstPort());
  }

  return (
    <Grid container spacing={1} alignItems="stretch">
      <Grid item>
        <TextField
          error={error}
          className={classes.input}
          label="Port"
          select
          variant="outlined"
          helperText="Please select the port to use"
          value={selectedPort}
          onChange={handleChange}
        >
          { ports.map(name => (
            <MenuItem key={name} value={name}>{ name }</MenuItem>
          )) }
        </TextField>
      </Grid>
      <Grid item>
        <IconButton className={classes.button} onClick={handleRefreshClick}>
          <RefreshIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

PortSelect.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
};

export default PortSelect;
