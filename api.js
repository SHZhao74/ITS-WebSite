import mongoose from 'mongoose'
import cache from 'memory-cache'
import Car from './model/car'
import Record from './model/record'

export const getCarList = (req, res) => {
  const carlist = cache.get('carlist')
  if (carlist)
    return res.json(carlist)
  else Car.find({}, (err, carList) => {
    if(err) {
      console.error(err);
      return res.status(400).send(err)
    }
    cache.put('carlist', carList)
    return res.json(carList)
  })
}
export const postCar = (req, res) => {
  const car = req.query;
  // const { driver, plate, status, location, speed, address, note} = req.body;
  // console.log('tmp:',req.query)
  console.log('car:',car)
  const NewCar = new Car(car);
  NewCar.save(err => err ? console.error(err)&& res.send(err) : res.send('OK'))
}
export const getAbnormal = (req, res) => {
  const rList = cache.get('rList')
  if (rList) return res.json(rList)
  else Record.find({}, (err, rList) => {
    if(err) {
      console.error(err);
      return res.status(400).send(err)
    }
    cache.put('rList', rList)
    return res.json(rList)
  })
}
