import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Card, Button, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { 
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress(){
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginFailed(){
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    });
  }

  onLoginSuccess(){
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  renderButton() {
    if(this.state.loading){
      return <Spinner size='small' />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection> 
          <Input 
            label='Email'
            placeholder='user@gmail.com'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>

        <CardSection> 
          <Input 
            label='Password'
            placeholder='password'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
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

export default LoginForm;