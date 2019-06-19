import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import WSS from '../serial/WSS';

const BuzzerButton = ({ board }) => {
  const [buzzing, setBuzzing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  board.on('open', () => setDisabled(false));
  board.on('close', () => setDisabled(true));

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
      disabled={disabled}
      onClick={() => setBuzzing(!buzzing)}
    >
      {buzzing ? 'Stop ' : 'Start '}
      buzzer
    </Button>
  );
};

BuzzerButton.propTypes = {
  board: PropTypes.instanceOf(WSS).isRequired,
};
export default BuzzerButton;
