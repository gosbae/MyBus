import axios from 'axios';
import {busApiKey} from '../../key/busApiKey';
import {busStationNo} from '../data/busStationInfo';
import {useState} from 'react';
export type BusDataProps = {
  busNumber: string;
  predictTime1: string;
  predictTime2: string;
  busRootName: string;
};

const gyeonggiBusStationUri = `https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=${busApiKey}&stationId=${busStationNo}`;
const gyeonggiBusRootUri = `http://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem?serviceKey=${busApiKey}&routeId=`;
export const FetchGyeonggiBusInfo = async () => {
  let tempBusRootName = '';
  const tempBusDataArray: Array<BusDataProps> = [];
  const parsedData = require('react-native-xml2js').parseString;
  try {
    await axios.get(gyeonggiBusStationUri).then(res => {
      parsedData(res.data, async (err: any, result: any) => {
        if (err !== null) {
          console.log('경기버스 정류장 정보 parse 에러: ' + err);
          return;
        }
        result.response.msgBody[0].busArrivalList.forEach(async (bus: any) => {
          await axios
            .get(gyeonggiBusRootUri + bus.routeId[0])
            .then(responseBusRoot => {
              try {
                parsedData(responseBusRoot.data, (err2: any, result2: any) => {
                  if (err2 !== null) {
                    console.log('파스에러' + err2);
                    return;
                  }
                  tempBusRootName =
                    result2.response.msgBody[0].busRouteInfoItem[0]
                      .routeName[0];
                });
              } catch (error2) {
                console.log('파스에러' + error2);
              }
            })
            .then(() => {
              tempBusDataArray.push({
                busNumber: bus.rounteId[0],
                predictTime1: bus.predictTime1,
                predictTime2: bus.predictTime2,
                busRootName: tempBusRootName,
              } as BusDataProps);
            });
        });

      });
    });
  } catch (error) {
    console.log('경기버스 정류장 정보 가져오기 에러: ' + error);
  }
  return tempBusDataArray;
};
