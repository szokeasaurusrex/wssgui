import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button,
} from '@material-ui/core';

const ErrorDialog = ({ message, isOpen, handleClose }) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
  >
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <DialogContentText>
        <em>
          {message}
        </em>
        <br />
        Please make sure that the board is
        plugged in and the correct port is selected.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">OK</Button>
    </DialogActions>
  </Dialog>
);

ErrorDialog.propTypes = {
  message: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

ErrorDialog.defaultProps = {
  message: '',
  isOpen: false,
  handleClose: () => {},
};

export default ErrorDialog;
