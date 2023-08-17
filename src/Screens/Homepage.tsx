import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, ImageBackground, StyleSheet, View} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
const HomePage = ({navigation}: StackScreenProps) => {
  return (
    <View style={styles.mainBackground}>
      <ImageBackground
        source={require('../img/back.jpg')}
        style={styles.imgBackground}>
        <View style={styles.upSideView}>
          <Text style={styles.titleText}>퇴근길 내가 탈 버스 정보앱</Text>
        </View>
        <View style={styles.downSideView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BusArrive')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
  },
  imgBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  upSideView: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downSideView: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
  },
  titleText: {
    fontFamily: 'Verdana',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgba(0,0,100,0.8)',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'rgb(92, 154, 225)',
    borderWidth: 3,
    borderColor: 'skyblue',
  },
});

export default HomePage;
