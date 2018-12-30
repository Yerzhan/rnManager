import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  onButtonPress(){
    const { email, password } = this.props;

    this.props.loginUser({email, password});
  }

  onEmailChange(text){
    this.props.emailChanged(text);
  }

  onPasswordChange(text){
    this.props.passwordChanged(text);
  }

  render() {
    return (
      <Card>
        <CardSection> 
          <Input 
            label='Email'
            placeholder='user@gmail.com'
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>

        <CardSection> 
          <Input 
            label='Password'
            placeholder='password'
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
            secureTextEntry
          />
        </CardSection>
        <CardSection> 
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
  emailChanged: text => dispatch(actions.emailChanged(text)),
  passwordChanged: text => dispatch(actions.passwordChanged(text)),
  loginUser: credentials => dispatch(actions.loginUser(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);