import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

const CustomButton = ({ title, onPress }) => {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="rgba(0, 0, 255, 0.2)" // Set the background color on touch
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableHighlight>
    );
  };

const styles = StyleSheet.create({

    buttonContainer: {
        top: 0,
        left: 0,
        zIndex: -1,
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '50%',
        padding: 10,
        paddingHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
      },
      button: {
        marginVertical: 10,
        width: 200, 
        backgroundColor: '#00008b',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
      },
      buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f5fffa',
      },
});

export default CustomButton;