import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorDialog from './ErrorDialog';
import WSS from '../serial/WSS';

function BoardError({ board }) {
  const [errorDialogProps, setErrorDialogProps] = useState({});

  board.on('error', err => setErrorDialogProps({
    isOpen: true,
    message: err.message,
    handleClose: () => setErrorDialogProps({ isOpen: false }),
  }));

  return (
    <ErrorDialog {...errorDialogProps} />
  );
}

BoardError.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
};

export default BoardError;
