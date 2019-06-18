import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/styles/makeStyles';
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

  useEffect(() => {
    async function getPortNames() {
      setPorts(await WSS.listPortNames());
    }
    getPortNames();
  }, []);

  function handleChange(event) {
    board.setPortName(event.target.value);
  }

  board.on('open', () => {
    setPortSelection(board.getPortName());
    setError(false);
  });
  board.on('error', () => {
    setPortSelection('');
    setError(true);
  });

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
