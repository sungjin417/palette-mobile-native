import React from 'react';
import { View, StyleSheet } from 'react-native';
import LocationProvider from './LocationProvider';
import WebViewComponent from './WebViewComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <LocationProvider>
        <WebViewComponent />
      </LocationProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
