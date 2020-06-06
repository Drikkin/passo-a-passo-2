import React from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Icon, Notifications } from 'expo';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import { Store } from './store';
import Sentry from 'sentry-expo';


Sentry.enableInExpoDevelopment = false;
Sentry.config('https://f936ff84849c42d58fe9424ce706a9b1@sentry.io/1445677').install();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default-notif', {
        name: 'Default Notif',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
          autoHideSplash={false}
        />
      );
    } else {
      return (
        <Provider store={Store} >
          <View style={Build.container}>
            <StatusBar barStyle="light-content"/>
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/plano-de-fundo/plano-de-fundo.png'),
        require('./assets/images/land-logo/land-logo.png'),
        require('./assets/images/aulas-de-danca/aulas-de-danca.png'),
        require('./assets/images/clube-de-vantagens/clube-de-vantagens.png'),
        require('./assets/images/white-logo-only/white-logo-only.png'),
        require('./assets/images/black-logo-only/black-logo-only.png'),
      ]),
      Font.loadAsync({
        'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-black': require('./assets/fonts/Roboto-Black.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    Sentry.captureMessage(error)
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const Build = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
