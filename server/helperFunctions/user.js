const NodeGeocoder = require('node-geocoder');
const distance = require('google-distance');
distance.apiKey = process.env.GOOGLE_API_GEO;

const userHelpers = {};

const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_API_GEO, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

userHelpers.getRandomPigeonName = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

userHelpers.getIntBelowNum = (num) => {
  return Math.floor(Math.random() * num);
}

userHelpers.getFloatBelowNum = (num) => {
  return Math.random() * num;
}

userHelpers.calculateTimeInMS = (distance, mph) => {
  return ((distance * 60 * 60 * 1000) / 60)
}

userHelpers.getLatAndLongFromAddress = async (address) => {
  try {
    const res = await geocoder.geocode(address);
    return { lat: res[0].latitude, long: res[0].longitude };
  } catch (err) {
    next(err);
  }
}

userHelpers.calculateDistance = (first, second) => {
  
}

module.exports = userHelpers;