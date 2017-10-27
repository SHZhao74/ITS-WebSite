import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

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

app.set('port', (process.env.PORT || 9487));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/carList', API.getCarList)
app.get('/abnormal', API.getAbnormal)
// app.post('/carList', API.postCarList)
// app.post('/abnormal', API.postAbnormal)


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
