/* eslint-disable react/destructuring-assignment */
import React from 'react';
import WaveformData from 'waveform-data';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import MediaImage from './MediaImage.jsx';

momentDurationFormatSetup(moment);

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      playState: 'play',
      currentTime: '0:00',
      artistClass: 'TP-artistNameDefault',
      waveformData: undefined,
      canvasTopColor: '#ccc',
      canvasBotColor: '#a0a0a0',
    };
    this.audio = new Audio(props.mediaFile);
    this.audio.ontimeupdate = () => {
      const formatTime = moment.duration(this.audio.currentTime, 'seconds').format();
      this.setState({ currentTime: formatTime });
    };
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
          scale: 512,
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
        // this.setState({ waveformData: waveform });
        const scaleY = (amplitude, height) => {
          const range = 256;
          const offset = 128;
          return height - ((amplitude + offset) * height) / range;
        };

        const channel = waveform.channel(0);
        // console.log('CAHNNEL', channel)
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        // ctx.globalCompositeOperation = 'xor';

        for (let x = 0; x < waveform.length; x++) {
          const val = channel.max_sample(x) * 6;
          ctx.fillStyle = this.state.canvasTopColor;
          ctx.fillStyle = this.state.canvasColor;
          ctx.fillRect(x, scaleY(val, canvas.height), 2, val);
          ctx.lineTo(x, scaleY(0, canvas.height), 2);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      });
  }

  playSong(song) {
    song.play();
    this.setState({ paused: song.paused, playState: 'pause' });
    // console.log(song.paused);
  }

  pauseSong(song) {
    song.pause();
    this.setState({ paused: song.paused, playState: 'play' });
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
          currentTime={this.state.currentTime}
          duration={moment.duration(this.audio.duration, 'seconds').format()}
          comments={this.props.comments}
          waveformData={this.state.waveformData}
        />

        <div className="TP-playComponent">
          <div className="TP-buttonContainer">
            <button
              type="button"
              id="TP-playButton"
              className="TP-playButton"
              onClick={this.playButtonClick}
            >
              <img className="TP-playIcon" src={`https://audiblymedia.s3-us-west-1.amazonaws.com/playbutton/${this.state.playState}.png`} alt={this.state.playState} />
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
