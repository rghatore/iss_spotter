// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log ('It worked! Returned IP:', ip);
// });

// const ipAddress = '75.159.4.78';
// const ipAddress = 'invalid address';
//
// fetchCoordsByIP(ipAddress, (error, coordinates) => {
//   if (error) {
//     console.log('Uh oh!', error);
//     return;
//   }
//
// console.log('Here are your coordinates:', coordinates);
//
// });

// const coordinates = { latitude: '53.45930', longitude: '-113.41450' }

// fetchISSFlyOverTimes(coordinates, (error, coordinates) => {
//   if (error) {
//     console.log('Uh oh!', error);
//     return;
//   }

// console.log('Here is the response array:', coordinates);

// });

nextISSTimesForMyLocation((passTimes) => {
  // if (error) {
  //   return console.log("It didn't work!", error);
  // }
  for (const times of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime); // this is where I had trouble
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
});