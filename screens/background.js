import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bng.png')}
        style={styles.imageBackground}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: '100%',
  },
});

export default Background;

//change//