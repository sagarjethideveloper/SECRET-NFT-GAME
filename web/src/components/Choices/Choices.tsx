import React from 'react';
import HandsignImg from '../../components/HandsignImg';
import * as Msg from '../../msg';

interface Props {
  handsignValue: Msg.Handsign;
  pickHandsign: Function;
}

const Choices = (props: Props) => {
  const { handsignValue, pickHandsign } = props;
  return (
    <div>
      <HandsignImg handsign={handsignValue} onClick={() => pickHandsign(handsignValue)} />
    </div>
  );
};

export default Choices;
