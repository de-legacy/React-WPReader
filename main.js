import React from 'react';
import { View, StyleSheet } from 'react-native';
import Blog from './app/screens/blog';
import SingleItem from './app/screens/single-item';
import { Router, Scene } from 'react-native-router-flux';
import Config from './app/config';

export default class Main extends React.Component {
  render() {
    return (
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} 
        barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}>
        <Scene key="root">
          <Scene key="Blog" component={Blog} title={Config.wordpress.blog_name}  initial={true} />
          <Scene key="SingleItem" component={SingleItem} title=""/>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor:'#00897b',
  },
  navBarTitle:{
      color:'#FFFFFF'
  },
  barButtonTextStyle:{
      color:'#FFFFFF'
  },
  barButtonIconStyle:{
      tintColor:'rgb(255,255,255)'
  },
});