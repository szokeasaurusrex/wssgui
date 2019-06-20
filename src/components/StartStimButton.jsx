import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function StartStimButton({ handleClick, boardIsOpen }) {
  const classes = useStyles();

  return (
    <Fab
      variant="expanded"
      color="secondary"
      disabled={!boardIsOpen}
      className={classes.fab}
      onClick={handleClick}
    >
      <InputIcon className={classes.icon} />
      Start stim
    </Fab>
  );
}

StartStimButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  boardIsOpen: PropTypes.bool.isRequired,
};

export default StartStimButton;
