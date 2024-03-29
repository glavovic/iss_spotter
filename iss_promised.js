const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip
  return request('https://freegeoip.app/json/' + ip + '?apikey=14318390-7a56-11ec-ac08-ffac0e985291')
};

const fetchISS = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
  
}

const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISS)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation }