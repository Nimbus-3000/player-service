/* eslint-disable react/destructuring-assignment */
import React from 'react';

const PlayButton = (props) => {
  console.log(props.song[0]);

  return (
    <div>
      <div>{props.song.songTitle}</div>
      <div>{props.song.artistName}</div>
    </div>
  );
};

export default PlayButton;
