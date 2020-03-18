/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

class AlbumCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    // console.log('click')
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div
        id="art"
        className="TP-artContainer"
        onClick={this.openModal}
      >
        <img className="TP-albumArt" src={this.props.albumArt} alt="" />
      </div>
    );
  }
};

export default AlbumCover;
