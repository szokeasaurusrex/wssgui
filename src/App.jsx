import React, { useState, useEffect, useCallback } from 'react';
import { Container } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import 'typeface-roboto';
import TopBar from './components/TopBar';
import BuzzerButton from './components/BuzzerButton';
import PortSelect from './components/PortSelect';
import WSS from './serial/WSS';
import BoardError from './components/BoardError';
import StimSettings from './components/StimSettings';

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


  const openListener = useCallback(() => setBoardIsOpen(true), []);
  const closeListener = useCallback(() => setBoardIsOpen(false), []);

  useEffect(() => {
    // Add listeners
    board.on('open', openListener);
    board.on('close', closeListener);

    return () => {
      // Remove listeners
      board.off('open', openListener);
      board.off('close', closeListener);
    };
  }, [openListener, closeListener]);

  return (
    <ThemeProvider theme={theme}>
      <TopBar>
        <BuzzerButton board={board} boardIsOpen={boardIsOpen} />
      </TopBar>
      <Container className={classes.container}>
        <PortSelect board={board} />
        <br />
        <StimSettings board={board} boardIsOpen={boardIsOpen} />
      </Container>
      <BoardError board={board} />
    </ThemeProvider>
  );
};

export default App;
