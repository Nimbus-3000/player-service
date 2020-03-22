import React from 'react';

class SongInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagClass: 'TP-tagDefault',
    };
    this.tagMouseover = this.tagMouseover.bind(this);
    this.tagMouseleave = this.tagMouseleave.bind(this);
  }

  tagMouseover() {
    this.setState({ tagClass: 'TP-tagHover' });
  }

  tagMouseleave() {
    this.setState({ tagClass: 'TP-tagDefault' });
  }

  render() {
    return (
      <div className="TP-songInfo">
        <div className="TP-date">{this.props.date}</div>
        <div
          id="TP-tag"
          className={this.state.tagClass}
          onMouseEnter={this.tagMouseover}
          onMouseLeave={this.tagMouseleave}
        >
          {`# ${this.props.tag}`}
        </div>
      </div>
    );
  }
};

export default SongInfo;
