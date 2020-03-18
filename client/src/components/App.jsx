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
      song: [],
      isPlaying: false,
    };
    this.getSongData = this.getSongData.bind(this);
    this.playSong = this.playSong.bind(this);
  }

  componentDidMount() {
    this.getSongData();
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

  playSong(audio) {
    if (!this.state.isPlaying) {
      audio.play();
      console.log('song playing');
      this.setState({ isPlaying: true });
    } else if (this.state.isPlaying) {
      audio.pause();
      console.log('song paused');
      this.setState({ isPlaying: false });
    }
  }

  render() {
    const songData = this.state.song[0];
    // console.log(songData);
    if (songData) {
      return (
        <div className="TP-topPlayer">
          <PlayButton
            className="TP-playComponent"
            songTitle={songData.songTitle}
            artistName={songData.artistName}
            mediaFile={songData.mediaFile}
            playSong={this.playSong}
          />
          <AlbumCover />
          <MediaImage />
          <SongInfo />
        </div>
      );
    }
    return (null);
  }
}

export default App;
