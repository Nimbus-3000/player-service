import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import CSSModules from 'react-css-modules';
import styles from './SongInfo.css';

momentDurationFormatSetup(moment);

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
        <div className="TP-date">{moment(this.props.date).fromNow()}</div>
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
