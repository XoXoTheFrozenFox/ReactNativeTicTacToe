import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TicTacToe from './TicTacToe'; // Import your TicTacToe component

export default function TicTacToeScreen() { // Ensure this matches the file name
  return (
    <SafeAreaView style={styles.container}>
      <TicTacToe />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
