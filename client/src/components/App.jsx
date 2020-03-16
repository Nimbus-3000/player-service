/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import $ from 'jquery';

import PlayButton from './PlayButton.jsx';
import AlbumCover from './AlbumCover.jsx';
import MediaImage from './MediaImage.jsx';
import SongInfo from './SongInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: undefined,
    };
  }

  getSongData() {
    $.get('/songData')
      .done((data) => {
        this.setState({ song: data });
        // console.log(this.state.song[0]);
      })
      .fail(() => {
        // eslint-disable-next-line no-console
        console.log('error with get request');
      });
  }

  render() {
    return (
      <div>
        testing 123
        <PlayButton />
        <AlbumCover />
        <MediaImage />
        <SongInfo />
      </div>
    );
  }
}

export default App;
