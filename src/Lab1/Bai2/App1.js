import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    const ChucMung = (props) => {
    return (
    <View style={styles.container}>
      <Text>Chúc Mừng Bạn {props.name}</Text>
      <StatusBar style="auto" />
    </View>
  );
};
return (<ChucMung name = "phúc"/>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

