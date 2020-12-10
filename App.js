import React, { useState, useEffect } from 'react';
import { AsyncStorage, StatusBar, Platform, Text, Alert } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';
import * as Permissions from "expo-permissions";
import { AppLoading } from 'expo';
import * as Notifications from 'expo-notifications';


function App({ navigation }) {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {

    // NetInfo.fetch().then(state => {
    //   // console.log('Connection type', state.type);
    //   // console.log('Is connected?', state.isConnected);
    //   if(state.isConnected){
    //     Alert.alert(
    //         "Alert Title",
    //         [
    //           {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //           },
    //           {
    //             text: "OK",
    //             onPress: () => console.log("OK Pressed")
    //           }
    //         ],
    //         {
    //           cancelable: false
    //         }
    //     );
    //   }else {
    //     alert('error network');
    //   }
    // });

    // I18nManager.forceRTL(true);
    // AsyncStorage.clear();

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('orders', {
        name: 'E-mail notifications',
        importance: Notifications.AndroidImportance.HIGH,
        sound: true, // <- for Android 8.0+, see channelId property below
      });
    }

    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    async function loadFont() {
      await Font.loadAsync({
        FairuzBlack: require('./assets/fonts/Cairo-Black.ttf'),
        FairuzBold: require('./assets/fonts/Cairo-Bold.ttf'),
        FairuzLight: require('./assets/fonts/Cairo-Light.ttf'),
        FairuzNormal: require('./assets/fonts/Cairo-Regular.ttf'),
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsReady(true)
    }
    loadFont();

  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Root>
          <AppNavigator />
        </Root>
      </PersistGate>
    </Provider>
  );
}

export default App;
