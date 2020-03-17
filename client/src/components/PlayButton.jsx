/* eslint-disable react/destructuring-assignment */
import React from 'react';

const PlayButton = (props) => {
  const playButtonClick = () => {
    console.log('clicked');
    props.playSong(props.mediaFile);
  };

  return (
    <div>
      <button type='button'
        id="TP-playButton" className="TP-playButton"
        onClick={playButtonClick}
      >
        PLAY
      </button>
      <div className="TP-playSongInfo">
        <div className="TP-songTitle">{props.songTitle}</div>
        <div className="TP-artstName">{props.artistName}</div>
      </div>
    </div>
  );
};

export default PlayButton;
