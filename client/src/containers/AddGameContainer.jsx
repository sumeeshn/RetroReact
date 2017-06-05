import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Form } from '../components';
import * as gamesActionCreators from '../actions/games';
import * as filestackActionCreators from '../actions/filestack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddGameContainer extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  // submit() {
  //   // We create the newGame object to be posted to the server
  //   const newGame = Object.assign({}, this.state.newGame, { picture: $('#picture').attr('src') });
  //   fetch('http://localhost:3000/games', {
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     }),
  //     method: 'POST',
  //     body: JSON.stringify(newGame)
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     // go back to game list view
  //     hashHistory.push('/games');
  //   });
  // }

  submit (event) {
    event.preventDefault();
    this.props.gamesActions.postGame();
    hashHistory.push('/games');
  }

  uploadPicture() {
    this.props.filestackActions.uploadPicture();
  }

  render() {
    const { picture } = this.props;
    return (
      <Form
        handleSubmit={this.submit}
        picture={picture}
        uploadPicture={this.uploadPicture}
      />
    );
  }

}

function mapStateToProps (state) {
  return {
    picture: state.getIn(['filestack', 'url'], '')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gamesActions: bindActionCreators(gamesActionCreators, dispatch),
    filestackActions: bindActionCreators(filestackActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddGameContainer);
