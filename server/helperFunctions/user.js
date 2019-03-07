const NodeGeocoder = require('node-geocoder');
const distance = require('google-distance');
distance.apiKey = process.env.GOOGLE_API_GEO;

const userHelpers = {};

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_GEO, 
  formatter: null
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
    console.log(err);
  }
}

userHelpers.calculateDistance = (first, second) => {
  
}

module.exports = userHelpers;