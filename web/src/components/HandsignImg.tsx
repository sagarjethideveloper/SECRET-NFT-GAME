import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as Msg from '../msg';
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  handsignDiv: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px',
    padding: '1rem',
    borderColor: 'rgba(243, 244, 246, var(--tw-border-opacity))',
    borderRadius: '9999px',
    margin: 'auto 12px auto 12px',
    cursor:'pointer'
  },
  handsignImg: {
    width: '80%',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

interface Props {
  handsign: Msg.Handsign;
  onClick?: Function;
}

const HandsignImg = (props: Props) => {
  const classes = useStyles();
  let handsignImg = classes.handsignImg;
  if (props.onClick) {
    handsignImg = clsx(classes.handsignImg, classes.clickable);
  }

  let img;
  switch (props.handsign) {
    case Msg.Handsign.Rock:
      img = '💎';
      break;
    case Msg.Handsign.Paper:
      img = '📜';
      break;
    case Msg.Handsign.Scissors:
      img = '✂️';
  }

  return (
    <div className={classes.handsignDiv}>
      {/* <img
        src={img}
        alt={props.handsign.toString()}
        className={handsignImg}
        onClick={() => props.onClick && props.onClick()}
      /> */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full border-coolGray-100 shadow-md p-4 text-4xl"
        onClick={() => props.onClick && props.onClick()}
      >
        {img}
      </motion.div>
    </div>
  );
};

export default HandsignImg;
