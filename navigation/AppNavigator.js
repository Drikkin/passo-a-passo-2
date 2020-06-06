import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Animated, Easing } from 'react-native';

import LandSc from '../screens/LandSc';
import BaseSc from '../screens/BaseSc';

export default createAppContainer(
  createStackNavigator(
    {
      LandSc: { screen: LandSc},
      BaseSc: { screen: BaseSc},
    },
    {
      headerMode: 'none',
      mode: 'modal',
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;

          const height = layout.initHeight;
          const width = layout.initWidth;
          const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [width, 0, 0],
          });

          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
          });

          return { opacity, transform: [{ translateX }] };
        },
      }),
    }
  )
);
