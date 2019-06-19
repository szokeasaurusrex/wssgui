import React from 'react';
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

function StartStimButton() {
  const classes = useStyles();

  return (
    <Fab
      variant="expanded"
      color="secondary"
      className={classes.fab}
    >
      <InputIcon className={classes.icon} />
      Start stim
    </Fab>
  );
}

export default StartStimButton;
