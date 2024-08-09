import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Dimensions, Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';
import { LocationContext } from './LocationProvider';

const WebViewComponent = () => {
  const { location, errorMsg } = useContext(LocationContext);
  const webviewRef = useRef(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (location && webviewRef.current) {
      const script = `
        window.locationData = ${JSON.stringify(location)};
      `;
      webviewRef.current.injectJavaScript(script);
    }
  }, [location]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardVisible(true);
      setKeyboardHeight(event.endCoordinates.height);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (errorMsg) {
    Alert.alert('Error', errorMsg);
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://www.palette-mobile.store/' }}
        style={[styles.webview, { marginBottom: keyboardVisible ? -keyboardHeight +270 : 0 }]} // 키보드가 보일 때 marginBottom 설정
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: '100%',
    height: Dimensions.get('window').height, // WebView가 화면 전체를 차지하도록 설정
  },
});

export default WebViewComponent;
