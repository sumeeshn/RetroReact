import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Form } from '../components';

class AddGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: {}
    };
    this.submit = this.submit.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.setGame = this.setGame.bind(this);
  }

  submit() {
    // We create the newGame object to be posted to the server
    const newGame = Object.assign({}, this.state.newGame, { picture: $('#picture').attr('src') });
    // const newGame = Object.assign({}, { picture: $('#picture').attr('src') }, this.state.newGame);
    console.log(newGame);
    fetch('http://localhost:3000/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(newGame)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // go back to game list view
      hashHistory.push('/games');
    });
  }

  uploadPicture() {
    filepicker.pick (
      {
        mimetype: 'image/*', // Cannot upload other files but images
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER' // First choice to upload files from
      },
      function (Blob) {
        console.log(JSON.stringify(Blob));
        $('#picture').attr('src', Blob.url);
      },
      function (FPError) {
        console.log(FPError.toString());
      }
    );
  }

  setGame() {
    const newGame = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      year: document.getElementById('year').value,
      picture: $('#picture').attr('src')
    };
    this.setState({ newGame });
  }

  render() {
    return <Form submit={this.submit} uploadPicture={this.uploadPicture} setGame={this.setGame}/>
  }

}

export default AddGameContainer;
