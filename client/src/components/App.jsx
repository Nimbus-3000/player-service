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

  playSong(audioFile) {
    const audio = new Audio(audioFile);
    if (!this.state.isPlaying) {
      audio.play();
    } else if (this.state.isPlaying) {
      audio.pause();
    }
    // this.setState((state) => {
    //   return { isPlaying: !state.isPlaying };
    // });
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
