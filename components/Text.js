import React from 'react';
import { Text } from 'react-native';

// 100
export class RobotoThin extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-thin' }]} />;
  }
}
// 200
export class RobotoLight extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-light' }]} />;
  }
}
// 300
export class RobotoRegular extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-regular' }]} />;
  }
}
// 400
export class RobotoMedium extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-medium' }]} />;
  }
}
// 500
export class RobotoBold extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-bold' }]} />;
  }
}
// 600
export class RobotoBlack extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'roboto-black' }]} />;
  }
}
