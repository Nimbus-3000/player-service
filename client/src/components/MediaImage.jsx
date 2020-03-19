import React from 'react';

class MediaImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveClass: 'TP-waveDefault',
    };
  }

  render() {
    return (
      <div className="TP-mediaImage">
        <div className={this.state.waveClass}>{this.props.mediaFile}</div>
        <div className={this.state.waveClass}>{`CURRENT TIME: ${this.props.currentTime}`}</div>
        <div className={this.state.waveClass}>{`DURATION ${this.props.duration}`}</div>
      </div>
    );
  }
};

export default MediaImage;
