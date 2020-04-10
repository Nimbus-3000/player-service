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
    this.getSongData(Math.floor(Math.random() * 10000000) + 1);
  }

  getSongData(id) {
    $.get(`/api/songs/${id}`)
      .done(data => {
        data.songfile = `https://nimbus-3000.s3-us-west-1.amazonaws.com/songs/${data.songfile}.mp3`;
        data.coverfile = `https://eric-liu-turntable.s3-us-west-1.amazonaws.com/${data.coverfile}`;
        for (let comment of data.comments) {
          comment.useravatar = `https://eric-liu-turntable.s3-us-west-1.amazonaws.com/${comment.useravatar}`;
        }
        this.setState(data, () => console.log(this.state))
      })
      .fail(() => console.log('error with get request'));
  }

  render() {
    if (this.state.songname) {
      return (
        <div>
          <h1>audib.ly</h1>
          <div className="TP-topPlayer">
            <PlayButton
              className="TP-playComponent"
              songTitle={this.state.songname}
              artistName={this.state.username}
              mediaFile={this.state.songfile}
              comments={this.state.comments}
            />
            <AlbumCover
              albumArt={this.state.coverfile}
              songTitle={this.state.songname}
            />
            <SongInfo
              date={this.state.songdate}
              tag={this.state.genrename}
            />
          </div>
        </div>
      );
    }
    return (null);
  }
}

export default App;
