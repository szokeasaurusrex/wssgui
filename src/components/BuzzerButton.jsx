import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import WSS from '../serial/WSS';

const BuzzerButton = ({ board, boardIsOpen }) => {
  const [buzzing, setBuzzing] = useState(false);

  useEffect(() => {
    if (buzzing) {
      board.startBuzz();
    } else {
      board.stopBuzz();
    }
  }, [buzzing, board]);

  return (
    <Button
      color="inherit"
      disabled={!boardIsOpen}
      onClick={() => setBuzzing(!buzzing)}
    >
      {buzzing ? 'Stop ' : 'Start '}
      buzzer
    </Button>
  );
};

BuzzerButton.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
  boardIsOpen: PropTypes.bool.isRequired,
};
export default BuzzerButton;
