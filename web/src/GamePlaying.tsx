import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Typography, Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import HandsignImg from './components/HandsignImg';
import * as Msg from './msg';
import * as Game from './game';
import ScoreText from './components/ScoreText';
import CircularProgress from '@material-ui/core/CircularProgress';
import RoundEnd from './components/RoundEnd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '0 2rem 0 2rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '80rem',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  stars: {
    paddingBottom: '0.7em',
    textAlign: 'center',
  },
  round: {
    textAlign: 'center',
    fontFamily: 'Atkinson Hyperlegible, system-ui, ui-sans-serif',
  },
  leave: {
    textAlign: 'right',
    margin: '1em',
  },
  url: {
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    height: '100%',
  },
  you: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: '#475569',
    fontWeight: 700,
    fontFamily: 'Atkinson Hyperlegible, system-ui, ui-sans-serif',
  },
  them: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    color: '#991b1b',
    fontWeight: 700,
    fontFamily: 'Atkinson Hyperlegible, system-ui, ui-sans-serif',
  },
  score: {
    fontSize: '2.25rem',
    lineHeight: ' 2.5rem',
    fontWeight: 700,
  },
  scoreSection: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  choices: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center"
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface Props {
  game: Game.Game;
  playHandsign: (handsign: Msg.Handsign) => Promise<void>;
  leaveGame: Function;
  claimInactivity: () => Promise<void>;
  enqueueSnackbar: Function;
}

enum DisplayContent {
  PickHandsign,
  SelectedHandsign,
  Loading,
  Ending,
}

const GamePlaying = (props: Props) => {
  const classes = useStyles();
  const { game, playHandsign, leaveGame, claimInactivity, enqueueSnackbar } = props;
  const [pickedRound, setPickedRound] = useState<number>();
  const [claimingInactivity, setClaimingInactivity] = useState<boolean>(false);
  const pickHandsign = async (handsign: Msg.Handsign) => {
    setPickedRound(game.round);
    try {
      await playHandsign(handsign);
    } catch {
      setPickedRound(undefined);
    }
  };
  const tryClaimInactivity = async () => {
    setClaimingInactivity(true);
    try {
      await claimInactivity();
    } catch {
      setClaimingInactivity(false);
    }
  };

  if (game.stage === Game.Stage.Creating) {
    const now = Number(new Date());
    return (
      <div>
        <CircularProgress />
        {now > game.createdAt + 10 * 1000 && (
          <div>
            <Typography>
              This is taking a while. You can abandon if your entry transaction doesn't go through.
            </Typography>
            <Typography>
              Otherwise, abandoning results in loss of your entry funds (10 SCRT).
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              disabled={now < game.createdAt + 13 * 1000}
              onClick={() => leaveGame()}
            >
              DANGER: Abandon game
            </Button>
          </div>
        )}
      </div>
    );
  }

  let displayContent: DisplayContent = DisplayContent.PickHandsign;
  if (pickedRound === game.round) {
    displayContent = DisplayContent.Loading;
  }
  if (game.played) {
    displayContent = DisplayContent.SelectedHandsign;
  }
  if (game.stage === Game.Stage.Over) {
    displayContent = DisplayContent.Ending;
  }

  if (game.stage === Game.Stage.Lobby) {
    const query = new URLSearchParams();
    query.append('game', game.locator);
    const url = `${document.location.origin}?${query.toString()}`;
    return (
      <Container fixed maxWidth="sm">
        <Grid container spacing={4}>
          {game.privateGame && (
            <Grid item>
              <Typography>Send this link to your friend</Typography>

              <Grid container>
                <Grid item sm={9} xs={12}>
                  <Box bgcolor="primary.main" color="primary.contrastText" p={1}>
                    <Typography className={classes.url}>{url}</Typography>
                  </Box>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    component="div"
                    fullWidth
                    className={classes.url}
                    onClick={() => {
                      navigator.clipboard.writeText(url);
                      enqueueSnackbar('Join link copied to clipboard', { variant: 'success' });
                    }}
                  >
                    Copy
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Typography>Waiting for other player</Typography>
            {claimingInactivity ? (
              <div className={classes.spinner}>
                <CircularProgress />
              </div>
            ) : (
              <Button variant="contained" color="primary" onClick={tryClaimInactivity}>
                Cancel game
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <RoundEnd round={game.round} rounds={game.rounds} />
      {/* <h2 className={classes.round}>
        Round {game.stage === Game.Stage.Over ? game.round - 1 : game.round}
      </h2> */}
      <div className={classes.scoreSection}>
        <div className={classes.stars}>
          <ScoreText
            score={game.wins}
            label="YOU"
            labelClass={classes.you}
            scoreClass={classes.score}
          />
        </div>
        <div className={classes.stars}>
          <ScoreText
            score={game.losses}
            label="THEM"
            labelClass={classes.them}
            scoreClass={classes.score}
          />
        </div>
      </div>
      <div className={classes.choices}>
        {displayContent === DisplayContent.Loading && <CircularProgress />}
        {displayContent === DisplayContent.SelectedHandsign && game.lastHandsign && (
          <>
            <div>
              <HandsignImg handsign={game.lastHandsign} />
              <div>you choose {DisplayContent.SelectedHandsign}</div>
            </div>

            <div>VS</div>

            <div>
              <div>waiting for them</div>
            </div>
          </>
        )}
        {displayContent === DisplayContent.Ending && <p>You {game.won ? 'won' : 'lost'}</p>}
        {displayContent === DisplayContent.PickHandsign && (
          <div className={classes.choices}>
            <HandsignImg
              handsign={Msg.Handsign.Rock}
              onClick={() => pickHandsign(Msg.Handsign.Rock)}
            />

            <HandsignImg
              handsign={Msg.Handsign.Paper}
              onClick={() => pickHandsign(Msg.Handsign.Paper)}
            />

            <HandsignImg
              handsign={Msg.Handsign.Scissors}
              onClick={() => pickHandsign(Msg.Handsign.Scissors)}
            />

            {/* {game.lossDeadlineSeconds !== undefined && game.lossDeadlineSeconds > 0 && (
                  <p>You have {game.lossDeadlineSeconds}s</p>
                )}
                {game.lossDeadlineSeconds === 0 && (
                  <p>Play before opponent claims victory for inactivity</p>
                )} */}
          </div>
        )}
      </div>
      {game.stage === Game.Stage.Over && (
        <div className={classes.leave}>
          <Button variant="contained" color="primary" onClick={() => leaveGame()}>
            Leave game
          </Button>
        </div>
      )}
    </div>
  );
};

export default GamePlaying;
