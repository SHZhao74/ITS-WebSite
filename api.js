import mongoose from 'mongoose'
import Car from './model/car'
import Record from './model/record'

export const getCarList = (req, res) => {
  Car.find({}, (err, carList) => {
    if(err) {
      console.error(err);
      return res.status(400).send(err)
    }
    return res.json(carList)
  })
}
export const getAbnormal = (req, res) => {
  Record.find({}, (err, rList) => {
    if(err) {
      console.error(err);
      return res.status(400).send(err)
    }
    return res.json(rList)
  })
}
