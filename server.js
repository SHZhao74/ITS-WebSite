import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'
import * as API from './api'

mongoose.Promise = global.Promise;
mongoose.connect('localhost');
mongoose.connection
  .on('error', () => {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
  })
  .once('open', () => {
    console.log('mongoose opened!');
  });

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('port', (process.env.PORT || 80));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.get('/', routes.index);
app.get('/realtime', routes.realtime);
app.get('/monitor', routes.monitor);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.route('/car')
  .get(API.postCar)
app.get('/carList', API.getCarList)
app.get('/abnormal', API.getAbnormal)
// app.post('/carList', API.postCarList)
// app.post('/abnormal', API.postAbnormal)

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
