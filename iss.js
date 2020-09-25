const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', 'utf-8', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;

    // if (!ip) {
    // const msg = 'IP not found!';
    // callback(Error(msg), null);
    // } else {
    callback(null, ip);
    // }
  });
};

const fetchCoordsByIP = (ipAddress, callback) => {
  request(`https://ipvigilante.com/${ipAddress}`, 'utf-8', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const info = JSON.parse(body); // all of this can be refactored
    const coordinates = {}; // const { latitude, longitude } = JSON.parse(body).data;

    coordinates.latitude = info.data.latitude; //
    coordinates.longitude = info.data.longitude; //

    callback(null, coordinates);

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, 'utf-8', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    //  Is checking data.message a redundant exercise? Yes, because the status code is not 200 when that happens
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return console.log('Unable to get IP address!', error);
    }
    // console.log(ip); // test output for ip address string
    
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return console.log('Unable to get coordinates!', error);
      }
      // console.log(coordinates); // test output for coordinates object

      fetchISSFlyOverTimes(coordinates, (error, flyoverTimes) => {
        if (error) {
          return console.log('Unable to get ISS flyover times!', error);
        }
        // console.log(flyoverTimes); // test output for flyover times array

        callback(flyoverTimes);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };