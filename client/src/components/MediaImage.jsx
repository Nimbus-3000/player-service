import React from 'react';

class MediaImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waveClass: 'TP-waveDefault',
    };
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
        <div className={this.state.waveClass}>{this.props.mediaFile}</div>
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
