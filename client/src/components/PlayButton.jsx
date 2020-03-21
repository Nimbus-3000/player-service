/* eslint-disable react/destructuring-assignment */
import React from 'react';
import WaveformData from 'waveform-data';
import MediaImage from './MediaImage.jsx';

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      playState: 'PLAY',
      artistClass: 'TP-artistNameDefault',
      waveformData: undefined,
    };
    this.audio = new Audio(props.mediaFile);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.playButtonClick = this.playButtonClick.bind(this);
    this.nameMouseover = this.nameMouseover.bind(this);
    this.nameMouseleave = this.nameMouseleave.bind(this);
    this.getWaveFormData = this.getWaveFormData.bind(this);

  }

  componentDidMount() {
    this.getWaveFormData(this.props.mediaFile);
  }

  getWaveFormData(fileUrl) {
    const audioContext = new AudioContext();

    fetch(fileUrl)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const options = {
          audio_context: audioContext,
          array_buffer: buffer,
          scale: 128,
        };
        return new Promise((resolve, reject) => {
          WaveformData.createFromAudio(options, (err, waveform) => {
            if (err) {
              reject(err);
            }
            else {
              resolve(waveform);
            }
          });
        });
      })
      .then(waveform => {
        this.setState({ waveformData: waveform });
        console.log(waveform)
        console.log(`Waveform has ${waveform.channels} channels`);
        console.log(`Waveform has length ${waveform.length} points`);
      });
  }

  playSong(song) {
    song.play();
    this.setState({ paused: song.paused, playState: 'PAUSE' });
    // console.log(song.paused);
  }

  pauseSong(song) {
    song.pause();
    this.setState({ paused: song.paused, playState: 'PLAY' });
    // console.log(song.paused);
  }

  playButtonClick() {
    if (this.state.paused) {
      this.playSong(this.audio);
    } else if (!this.state.paused) {
      this.pauseSong(this.audio);
    }
  }

  nameMouseover() {
    this.setState({ artistClass: 'TP-artistNameHover' });
  }

  nameMouseleave() {
    this.setState({ artistClass: 'TP-artistNameDefault' });
  }



  render() {
    return (
      <div>
        <MediaImage
          mediaFile={this.props.mediaFile}
          currentTime={this.audio.currentTime}
          duration={this.audio.duration}
          comments={this.props.comments}
        />
        <div className="TP-playComponent">
          <div className="TP-buttonContainer">
            <button
              type="button"
              id="TP-playButton"
              className="TP-playButton"
              onClick={this.playButtonClick}
            >
              {this.state.playState}
            </button>
          </div>
          <div className="TP-playSongInfo">
            <div
              className="TP-nameContainer"
              onMouseEnter={this.nameMouseover}
              onMouseLeave={this.nameMouseleave}
            >
              <div className={this.state.artistClass}>{this.props.artistName}</div>
            </div>
            <div className="TP-songTitle">{this.props.songTitle}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayButton;
