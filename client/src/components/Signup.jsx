import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';
import * as authActionCreators from '../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const passwordField = (password) =>
  <div>
    <input type="password" {...password} placeholder="Enter Password"/>
  </div>

class Signup extends PureComponent {
  // signupUser dispatches SIGNUP_USER to be intercepted by a redux-saga
  register () {
    this.props.authActions.signupUser();
  }

  render () {
    const { picture, uploadPicture } = this.props;
    return (
      <div className="row scrollable">
        <div className="col-md-offset-2 col-md-8">
          <div className="text-left">
            <Link to="/games" className="btn btn-info">Back</Link>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">
                Sign Up
              </h2>
            </div>
            <div className="panel-body">
              <form onSubmit={this.props.handleSubmit}>
                <div className="form-group text-left">
                  <label htmlFor="email">E-mail</label>
                  <Field
                    name="email"
                    type="text"
                    className="form-control"
                    component="input"
                    placeholder="Enter the e-mail"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="name">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    component="input"
                    placeholder="Enter the name"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    component={passwordField}
                    className="form-control"
                    rows="5"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-submit btn-block"
                  onClick={() => this.register()}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Bint the action-creators to be used as props
function mapDispatchToProps (dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}
// redux-form HOC to wrap the component
export default reduxForm({ form: 'signup' })(connect(null, mapDispatchToProps)(Signup));
