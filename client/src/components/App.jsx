import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {},
    };
  }

  componentDidMount() {
    $.get('/songData')
      .done((data) => {
        this.setState({ song: data });
        // console.log(this.state.songs);
      })
      .fail(() => {
        console.log('error with get request');
      });
  }

  render() {
    return (
      <div>testing 123</div>
    );
  }
}

export default App;
