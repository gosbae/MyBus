import {Button, Text, StyleSheet, View, FlatList} from 'react-native';
import BusInfo from '../Components/BusInfo';
import {FetchGyeonggiBusInfo} from '../server/gyeonggiBusArriveInfo';
import type {BusDataProps} from '../server/gyeonggiBusArriveInfo';
import {useEffect, useState} from 'react';

const BusArrive = () => {
  const [busData, setBusData] = useState<Array<BusDataProps>>([]);
  async function fetchBusInfo() {
    try {
      const data = await FetchGyeonggiBusInfo();
      setBusData(
        data.sort((a, b) => Number(a.predictTime1) - Number(b.predictTime1)),
      );
      console.log(busData);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchBusInfo();
    // const fetchMin = setInterval(fetchBusInfo, 60000);
    // return () => clearInterval(fetchMin);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>무슨 버스가 먼저 올라나</Text>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          style={{flex: 1, marginTop: 30}}
          data={busData}
          renderItem={({item}) => (
            <BusInfo
              busNumber={item.busNumber}
              busRootName={item.busRootName}
              predictTime1={item.predictTime1}
              predictTime2={item.predictTime2}
            />
          )}
          keyExtractor={item => item.busNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(156, 192, 240, 0.852)',
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
});

export default BusArrive;
