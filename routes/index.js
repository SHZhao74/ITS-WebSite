import Car from '../model/car'
import cache from 'memory-cache'


exports.index = function(req, res) {
  init("index2",req, res);
};

exports.monitor = function(req, res) {
  init("monitor",req, res);
};


function init(page,req, res){
  var async = require('async');
  const getTitle="車訊快遞平台";
  var menus="aaa";
  async.parallel([
    function(callback) {
      mongo( function(response){
        callback(null, response);
      });
    },
    function(callback) {
      msql( function(response){
        callback(null, response);
      });
    }
  ],
  function(err,results){
    if(err) throw err; 
    //console.log(results);
    res.render(page, {
      title: getTitle,
      content: results[0],
      classname: 'homepage',
      menus: results[1]
    });
  });
   
}

function mongo(callback){
  console.log("2");
  Car.find({}, (err, carList) => {
    console.log("B_premongo");
    //console.log(carList);
    if(err) {
      return console.error(err);
      //return res.status(400).send(err)
    }
    cache.put('carlist', carList);
    return callback(carList);;
  })
}
function msql(callback){
  var sql="SELECT * FROM test.item WHERE visible LIKE 1 ORDER BY no ASC;";
  // const getCarList="車號:AB-123;地址:中正紀念堂;lat:23.344;Lon:123.33";
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ABCDabcd1234",
    database: "test"
  });
  console.log("1");
  con.connect(function(err) {
    console.log("B_presql");
    if (err) throw err;
    //Select all customers and return the result object:
    //sql="SELECT * FROM test.item WHERE visible LIKE 1 ORDER BY no ASC;";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      var menus=result;
      for (var i of result){
        i.name
        console.log(i.no);
        //console.log(result[i].no);  //var i in result
      }
      return callback(menus);;
    });
  });
}

function aaa(num){
  num=num+1;
  console.log(num);
}
function loop(num){
  for(var i=0;i<num;i++){
    console.log("Loop"+i);
  }
}
