import React from 'react';
import WaveformData from 'waveform-data';


class MediaImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const comments = this.props.comments.map((comment, i) => {
      return (
        <div className="TP-comment" key={i}>
          {/* <div className="TP-commentText" >
            <div>{comment.username}</div>
            <div>{comment.comment}</div>
          </div> */}
          <img className="TP-avatar" src={comment.avatar} alt="" />
        </div>
      );
    });

    return (
      <div className="TP-mediaImage">
          <canvas id="canvas" width="1000" height="200"></canvas>
        <div className="TP-currentTime">{`${this.props.currentTime}`}</div>
        <div className="TP-duration">{`${this.props.duration}`}</div>
        <div className="TP-commentBlock">
          {comments}
        </div>
      </div>
    );
  }
};

export default MediaImage;
