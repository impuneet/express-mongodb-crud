const express = require('express');
const router = express.Router();
const rp = require('request-promise');

router.post('/getWeatherByCity', async (req, res, next) => {
    const req_options = {
        method: 'GET',
        uri: 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
        headers: {
          'content-type': 'application/json'
        }
      };
      rp(req_options).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err);
      })
});


module.exports = router;