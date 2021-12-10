import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '30em',
  },
  secret: {
    textAlign: 'center',
    letterSpacing: '2rem',
  },
  rps: {
    textAlign: 'center',
    wordSpacing: 99999,
  },
  header: {
    fontSize: '3rem',
    lineHeight: 1,
    textAlign: 'center',
    fontWeight: 600,
    fontFamily: ' Atkinson Hyperlegible, system-ui, ui-sans-serif',
    padding: "3rem 0 3rem 0"
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <span>SECRET</span>
        <br />
        <span className="block"> Rock Paper Scissors</span>
      </div>
    </div>
  );
};
export default Banner;
