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
    this.state = {};
    this.getSongData = this.getSongData.bind(this);
  }

  componentDidMount() {
    this.getSongData();
  }

  getSongData() {
    $.get('/api')
      .done(data => this.setState(data, () => console.log(this.state)))
      .fail(() => console.log('error with get request'));
  }

  render() {

    if (this.state.songTitle) {
      return (
        <div>
          <h1>audib.ly</h1>
          <div className="TP-topPlayer">
            <PlayButton
              className="TP-playComponent"
              songTitle={this.state.songTitle}
              artistName={this.state.artistName}
              mediaFile={this.state.mediaFile}
              comments={this.state.comments}
            />
            <AlbumCover
              albumArt={this.state.albumCover}
              songTitle={this.state.songTitle}
            />
            <SongInfo
              date={this.state.postDate}
              tag={this.state.tag}
            />
          </div>
        </div>
      );
    }
    return (null);
  }
}

export default App;
