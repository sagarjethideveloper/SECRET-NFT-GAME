import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 2rem 0 2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '36rem',
    marginTop: '100px',
  },
  fontBold:{
      fontWeight:700,
  }
}));

const Description = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="w-max mx-auto">
        <h2 className="text-4xl font-bold text-center">WHAT IS THIS ?</h2>
        <p className="max-w-xs mt-2">
          Rock, Paper, Scissors is a game of chance that expands. It is first used to
          settle a dispute about what to watch on TV between Sheldon and Raj in &quot;The
          Lizard-Spock Expansion&quot;.
        </p>

        <a
          href="https://the-big-bang-theory.com/rock-paper-scissors-lizard-spock/"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-700 underline mt-2"
        >
          click here for more information
        </a>

        <h2 className="text-2xl font-bold mt-8">How to play</h2>
        <ol className="mt-2 list-decimal max-w-xs">
        <li>Click on Play with Anyone.</li>
          <li>Wait here for them to show up.</li>
          <li>The game begins automatically when your friend online.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8">The rules</h2>
        <ul className="mt-2">
          <li>
            <span className={classes.fontBold}>Scissors</span> cuts
            <span className={classes.fontBold}> Paper</span>
          </li>
          <li>
            <span className={classes.fontBold}>Paper</span> covers
            <span className={classes.fontBold}> Rock</span>
          </li>
          <li>
            <span className="italic mr-2">(and as it always has)</span>
            <span className={classes.fontBold}>Rock</span> crushes
            <span className={classes.fontBold}> Scissors</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Description;
