import React from 'react';
import WaveformData from 'waveform-data';


class MediaImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveClass: 'TP-waveDefault',
    };
    // this.drawWaveform = this.drawWaveform.bind(this);
  }

  render() {

    const comments = this.props.comments.map((comment, i) => {
      return (
        <div className="TP-comment" key={i}>
          <img className="TP-avatar" src={comment.avatar} alt="" />
        </div>
      );
    });

    return (
      <div className="TP-mediaImage">
          <canvas id="canvas" width="1000" height="200"></canvas>
        <div className={this.state.waveClass}>{`CURRENT TIME: ${this.props.currentTime}`}</div>
        <div className={this.state.waveClass}>{`DURATION ${this.props.duration}`}</div>
        <div className="TP-commentBlock">
          {comments}
        </div>
      </div>
    );
  }
};

export default MediaImage;
