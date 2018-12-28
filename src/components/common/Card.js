import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10
  }
};

export { Card };
