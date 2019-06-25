import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ErrorDialog from './ErrorDialog';
import WSS from '../serial/WSS';

function BoardError({ board }) {
  const [errorDialogProps, setErrorDialogProps] = useState({});

  const errorListener = useCallback(err => setErrorDialogProps({
    isOpen: true,
    message: err.message,
    handleClose: () => setErrorDialogProps({ isOpen: false }),
  }), []);

  useEffect(() => {
    // Add listener
    board.on('error', errorListener);

    // Remove listener on unmount
    return () => board.off('error', errorListener);
  }, [board, errorListener]);

  return (
    <ErrorDialog {...errorDialogProps} />
  );
}

BoardError.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
};

export default BoardError;
