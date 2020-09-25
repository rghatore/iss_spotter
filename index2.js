const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation().then((passTimes) => {
  for (const times of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}).catch((error) => {
  console.log("Uh oh, didn't work!", error);
});