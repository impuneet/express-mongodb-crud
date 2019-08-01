const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const rp = require('request-promise');
const app = express();

const cors = require('cors');
// connection to db
mongoose.connect('mongodb://localhost/crud-mongo')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));
  
app.use(cors());

// importing routes
const indexRoutes = require('./routes/index');

// importing third party API routes
const thirdPartyRoutes = require('./routes/thirdPartyRoutes');




// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);
app.use('external', thirdPartyRoutes);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
