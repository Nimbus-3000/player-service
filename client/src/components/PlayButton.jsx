/* eslint-disable react/destructuring-assignment */
import React from 'react';

const PlayButton = (props) => {
  // console.log(props);

  return (
    <div>
      <button type='button' className="TP-playButton">PLAY</button>
      <div className="TP-playSongInfo">
        <div className="TP-songTitle">{props.songTitle}</div>
        <div className="TP-artstName">{props.artistName}</div>
      </div>
    </div>
  );
};

export default PlayButton;
