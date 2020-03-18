import React from 'react';

const AlbumCover = (props) => {

  return (
    <div className="TP-artContainer">
      <img className="TP-albumArt" src={props.albumArt} alt="" />
    </div>
  );
};

export default AlbumCover;
