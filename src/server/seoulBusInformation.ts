import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { seoulBusApiKey } from '../../key/busApiKey';


const busUri =
  encodeURI(`http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?ServiceKey=${seoulBusApiKey}&busRouteId=100100118`);
export const fetchBusInfo = async () => {
  axios.get(busUri).then((response) => {
    console.log(response.data);
  }).catch((error) => {

    console.log(error);
    console.log(busUri);
  });

};







