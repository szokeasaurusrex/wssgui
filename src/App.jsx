import React from 'react';
import Container from '@material-ui/core/Container';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import 'typeface-roboto';
import TopBar from './components/TopBar';
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

const App = () => {
  const classes = useStyles();
  const board = new WSS();

  return (
    <ThemeProvider theme={theme}>
      <TopBar board={board} />
      <Container className={classes.container}>
        <PortSelect board={board} />
      </Container>
      <StartStimButton board={board} />
      <BoardError board={board} />
    </ThemeProvider>
  );
};

export default App;
