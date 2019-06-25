import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import 'typeface-roboto';
import TopBar from './components/TopBar';
import BuzzerButton from './components/BuzzerButton';
import PortSelect from './components/PortSelect';
import WSS from './serial/WSS';
import StartStimButton from './components/StartStimButton';
import BoardError from './components/BoardError';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const useStyles = makeStyles({
  container: {
    marginTop: theme.spacing(2),
  },
});

const board = new WSS();

const App = () => {
  const classes = useStyles();
  const [boardIsOpen, setBoardIsOpen] = useState(false);

  useEffect(() => {
    const openListener = () => setBoardIsOpen(true);
    const closeListener = () => setBoardIsOpen(false);

    // Add listeners
    board.on('open', openListener);
    board.on('close', closeListener);

    return () => {
      // Remove listeners
      board.off('open', openListener);
      board.off('close', closeListener);
    };
  }, [board]);

  function handleStartStimClick() {
    board.startStim();
  }

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <BuzzerButton board={board} boardIsOpen={boardIsOpen} />
      </TopBar>
      <Container className={classes.container}>
        <PortSelect board={board} />
      </Container>
      <StartStimButton handleClick={handleStartStimClick} boardIsOpen={boardIsOpen} />
      <BoardError board={board} />
    </ThemeProvider>
  );
};

export default App;
