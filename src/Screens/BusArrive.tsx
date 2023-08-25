import {Button, Text, StyleSheet, View, FlatList, Animated, ImageBackground} from 'react-native';
import BusInfo from '../Components/BusInfo';
import {FetchGyeonggiBusInfo} from '../server/gyeonggiBusArriveInfo';
import type {BusDataProps} from '../server/gyeonggiBusArriveInfo';
import {useEffect, useRef, useState} from 'react';
import {fadeIn} from '../styles/animation/normalanimation';

const BusArrive = () => {
  const [busData, setBusData] = useState<Array<BusDataProps>>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  async function fetchBusInfo() {
    try {
      const data = await FetchGyeonggiBusInfo();
      console.log(data);
      setBusData(
        data.sort((a, b) => Number(a.predictTime1) - Number(b.predictTime1)),
      );


    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchBusInfo();
    const fetchMin = setInterval(fetchBusInfo, 60000);
    return () => clearInterval(fetchMin);
  }, []);
  useEffect(() => {
    fadeIn(fadeAnim);
  }, [fadeAnim]);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/busInfoBackground.jpg')}
      style={styles.imgBackground}
      >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>집에 가자</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Animated.FlatList
          style={{flex: 1, marginTop: 29}}
          data={busData}
          renderItem={({item}) => (
            <BusInfo
              busNumber={item.busNumber}
              busRootName={item.busRootName}
              predictTime1={item.predictTime1}
              predictTime2={item.predictTime2}
              fadeAnim={fadeAnim}
            />
          )}
          keyExtractor={item => item.busNumber}
        />
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 8,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  imgBackground: {
    flex: 1,
  },
});

export default BusArrive;
