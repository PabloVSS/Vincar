import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../myButton/myButton.style';

function MyButton({ text, theme = 'primary', style, textStyle, onPress }) {
  const themeStyles = {
    primary: {
      button: styles.btnPrimary,
      text: styles.textOnPrimary,
    },
    secondary: {
      button: styles.btnSecondary,
      text: styles.textOnSecondary,
    },
  };

  const selectedTheme = themeStyles[theme] || themeStyles.primary;

  return (
    <TouchableOpacity
      style={[selectedTheme.button, style]}
      onPress={onPress}
      
    >
      <Text style={[selectedTheme.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

export default MyButton;