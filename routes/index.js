import Car from '../model/car'
import cache from 'memory-cache'

exports.index = function(req, res) {
  const getTitle="車訊快遞平台";
  // const getCarList="車號:AB-123;地址:中正紀念堂;lat:23.344;Lon:123.33";
  Car.find({}, (err, carList) => {
    if(err) {
      return console.error(err);
      // return res.status(400).send(err)
    }
    cache.put('carlist', carList);
    res.render('index2', {
      title: getTitle,
      content: carList,
      classname: 'homepage'
    });
  })
};
