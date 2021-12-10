import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  score: number;
  label: string;
  labelClass?: string;
  scoreClass?: string;
}

const ScoreText = (props: Props) => {
  const { score, label, labelClass, scoreClass } = props;

  return (
    <div className="text-center font-bold">
      <div className={labelClass}>{label}</div>
      <div className={scoreClass}> {score}</div>
    </div>
  );
};

export default ScoreText;
