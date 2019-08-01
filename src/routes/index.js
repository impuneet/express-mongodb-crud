const express = require('express');
const router = express.Router();
const User = require('../model/user');
const rp = require('request-promise');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.render('index', {
    users
  });
});


router.post('/getWeatherByCity', async (req, res, next) => {
  const req_options = {
    method: 'GET',
    uri: 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22',
  };
  rp(req_options).then(data => {
    res.json({ 'success': true, 'data': JSON.parse(data) });
  }).catch(err => {
    console.log(err);
  })
});

router.post('/add', async (req, res, next) => {
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.redirect('/');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const user = await User.findById(id);
  user.status = !user.status;
  await user.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user)
  res.render('edit', { user });
});


router.post('/edit/:id', async (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;
  await User.update({ _id: id }, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.remove({ _id: id });
  res.redirect('/');
});


module.exports = router;
