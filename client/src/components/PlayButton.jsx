/* eslint-disable react/destructuring-assignment */
import React from 'react';


const PlayButton = (props) => {
  const audio = new Audio(props.mediaFile);

  const playButtonClick = () => {
    props.playSong(audio);
  };

  return (
    <div className="TP-playComponent">
      <div className="TP-buttonContainer">
        <button
          type="button"
          id="TP-playButton"
          className="TP-playButton"
          onClick={playButtonClick}
        >
          PLAY
        </button>
      </div>
      <div className="TP-playSongInfo">
        <div className="TP-nameContainer">
          <div className="TP-artistName">{props.artistName}</div>
        </div>
        <div className="TP-songTitle">{props.songTitle}</div>
      </div>
    </div>
  );
};

export default PlayButton;
