/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import $ from 'jquery';

import PlayButton from './PlayButton.jsx';
import AlbumCover from './AlbumCover.jsx';
import SongInfo from './SongInfo.jsx';

import CSSModules from 'react-css-modules';
import styles from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: [],
      waveformData: undefined,
    };
    this.getSongData = this.getSongData.bind(this);
  }

  componentDidMount() {
    this.getSongData();
  }

  getSongData() {
    $.get('/songData')
      .done((data) => {
        this.setState({ song: data });
      })
      .fail(() => {
        // eslint-disable-next-line no-console
        console.log('error with get request');
      });
  }

  render() {
    const songData = this.state.song[0];

    if (songData) {
      return (
        <div>
          <h1>audib.ly</h1>
          <div className="TP-topPlayer">
            <PlayButton
              className="TP-playComponent"
              songTitle={songData.songTitle}
              artistName={songData.artistName}
              mediaFile={songData.mediaFile}
              comments={songData.comments}
            />
            <AlbumCover
              albumArt={songData.albumCover}
              songTitle={songData.songTitle}
            />
            <SongInfo
              date={songData.postDate}
              tag={songData.tag}
            />

          </div>
        </div>
      );
    }
    return (null);
  }
}

export default App;
