import axios from 'axios';
import {busApiKey} from '../../key/busApiKey';
import {busStationNo} from '../data/busStationInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type BusDataProps = {
  busNumber: string;
  predictTime1: string;
  predictTime2: string;
  busRootName: string;
};

const gyeonggiBusStationUri = `https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=${busApiKey}&stationId=${busStationNo}`;
const gyeonggiBusRootUri = `http://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem?serviceKey=${busApiKey}&routeId=`;
export const FetchGyeonggiBusInfo = async () => {
  const localBusData = await AsyncStorage.getAllKeys();
  let tempBusDataArray: Array<BusDataProps> = [];
  const xmlToJson = require('react-native-xml2js').parseString;

  try {
    const busStationInfo = await axios.get(gyeonggiBusStationUri);
    xmlToJson(busStationInfo.data, (err: any, busStaitionInfoResult: any) => {
      if (err !== null) {
        console.log(err);
        return;
      }
      console.log('---------------------fetched');
      busStaitionInfoResult.response.msgBody[0].busArrivalList.forEach(
        (bus: any) => {
          tempBusDataArray.push({
            busNumber: bus.routeId[0],
            predictTime1: bus.predictTime1[0],
            predictTime2: bus.predictTime2[0],
            busRootName: '',
          } as BusDataProps);
        },
      );
    });
    const process = async () => {
      await Promise.all(
        tempBusDataArray.map(async bus => {
          const busRootInfo = await axios.get(
            gyeonggiBusRootUri + bus.busNumber,
          );
          xmlToJson(busRootInfo.data, (err: any, busRootInfoResult: any) => {
            if (err !== null) {
              console.log(err);
              return;
            }
            bus.busRootName =
              busRootInfoResult.response.msgBody[0].busRouteInfoItem[0].routeName[0];
          });
          tempBusDataArray.forEach(async bus => {
            try {
              await AsyncStorage.setItem(bus.busNumber, bus.busRootName);
            } catch (storageError) {
              console.log(storageError);
            }
          });
          return bus;
        }),
      );
    };
    if (localBusData.length === 0) {
      process();
      console.log('------------------process');
    } else {
      tempBusDataArray.map(async bus => {
        const tempBusRootName = await AsyncStorage.getItem(bus.busNumber);
        if (tempBusRootName !== '') {
          bus.busRootName = tempBusRootName as string;
        } else {
          const reBusRootInfo = await axios.get(
            gyeonggiBusRootUri + bus.busNumber,
          );
          xmlToJson(reBusRootInfo.data, (err: any, busRootInfoResult: any) => {
            if (err !== null) {
              console.log(err);
              return;
            }
            bus.busRootName =
              busRootInfoResult.response.msgBody[0].busRouteInfoItem[0].routeName[0];
          });
        }
        return bus;
      });
      console.log('------------------after first process');
    }
  } catch (error) {
    console.log(error);
  } finally {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(tempBusDataArray);
      }, 3500);
    });
  }

  // try {
  //   await axios.get(gyeonggiBusStationUri).then(res => {
  //     parsedData(res.data, async (err: any, result: any) => {
  //       if (err !== null) {
  //         console.log('경기버스 정류장 정보 parse 에러: ' + err);
  //         return;
  //       }
  //       result.response.msgBody[0].busArrivalList.forEach(async (bus: any) => {
  //         await axios
  //           .get(gyeonggiBusRootUri + bus.routeId[0])
  //           .then(responseBusRoot => {
  //             try {
  //               parsedData(responseBusRoot.data, (err2: any, result2: any) => {
  //                 if (err2 !== null) {
  //                   console.log('파스에러' + err2);
  //                   return;
  //                 }
  //                 tempBusRootName =
  //                   result2.response.msgBody[0].busRouteInfoItem[0]
  //                     .routeName[0];
  //               });
  //             } catch (error2) {
  //               console.log('파스에러' + error2);
  //             }
  //           })
  //           .then(() => {
  //             tempBusDataArray.push({
  //               busNumber: bus.rounteId[0],
  //               predictTime1: bus.predictTime1[0],
  //               predictTime2: bus.predictTime2[0],
  //               busRootName: tempBusRootName,
  //             } as BusDataProps);
  //           });
  //       });

  //     });
  //   });
  // } catch (error) {
  //   console.log('경기버스 정류장 정보 가져오기 에러: ' + error);
  // }
  // return tempBusDataArray;
};
