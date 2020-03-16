/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import $ from 'jquery';

import PlayButton from './PlayButton.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: undefined,
    };
  }

  componentDidMount() {
    $.get('/songData')
      .done((data) => {
        this.setState({ song: data });
        // console.log(this.state.song[0]);
      })
      .fail(() => {
        // eslint-disable-next-line no-console
        console.log('error with get request');
      });
  }

  render() {
    if (this.state.song) {
      return (
        <div>
          testing 123
          <PlayButton song={this.state.song} />
        </div>
      );
    }
  }
}

export default App;
