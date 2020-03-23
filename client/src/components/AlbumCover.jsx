/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactModal from 'react-modal';
import CSSModules from 'react-css-modules';
import styles from './AlbumCover.css';

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
      <div>
        <div
          id="art"
          className="TP-artContainer"
          onClick={this.openModal}
        >
          <img className="TP-albumArt" src={this.props.albumArt} alt="" />
        </div>
        <ReactModal
          className="TP-modal"
          isOpen={this.state.showModal}
        >
          <div onClick={this.closeModal} className="TP-modalContent">
            <p className="TP-modalText">{this.props.songTitle}</p>
            <img className="TP-modalImg" src={this.props.albumArt} alt=""/>
          </div>
        </ReactModal>
      </div>
    );
  }
};

export default AlbumCover;
