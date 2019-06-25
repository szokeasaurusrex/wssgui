import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import WSS from '../serial/WSS';

const useStyles = makeStyles(theme => ({
  input: {
    minWidth: 200,
    margin: theme.spacing(1),
  },
}));

function PortSelect({ board }) {
  const classes = useStyles();
  const [selectedPort, setPortSelection] = useState('');
  const [ports, setPorts] = useState([]);
  const [error, setError] = useState(false);

  const openListener = useCallback(() => {
    setPortSelection(board.getPortName());
    setError(false);
  }, [board]);

  const errorListener = useCallback(() => {
    setPortSelection('');
    setError(true);
  }, []);

  useEffect(() => {
    // Get port names when component mounts
    async function getPortNames() {
      setPorts(await WSS.listPorts());
    }
    getPortNames();
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

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

PortSelect.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
};

export default PortSelect;
