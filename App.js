/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import keys from './config/keys';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = { loggedIn: null }

  componentWillMount(){
    firebase.initializeApp({
      apiKey: keys.apiKey,
      authDomain: keys.authDomain,
      databaseURL: keys.databaseURL,
      projectId: keys.projectId,
      storageBucket: keys.storageBucket,
      messagingSenderId: keys.storageBucket
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <SafeAreaView style={styles.container}>
          <LoginForm />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
