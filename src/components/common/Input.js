import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

class Input extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.labelStyle}>{this.props.label}</Text>
        <TextInput 
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            style={styles.inputStyle} 
            autoCorrect={false}
            placeholder={this.props.placeholder}
            secureTextEntry={this.props.secureTextEntry}
          />
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export { Input };