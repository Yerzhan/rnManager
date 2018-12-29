import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  onButtonPress(){
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  renderButton() {
    if(this.props.loading){
      return <Spinner size='small' />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  onEmailChange(text){
    this.props.emailChanged(text);
    console.log(this.props.email);
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

        <Text style={styles.errorTextStyle}>
          error
        </Text>

        <CardSection> 
          {this.renderButton()}
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
  passwordChanged: text => dispatch(actions.passwordChanged(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);