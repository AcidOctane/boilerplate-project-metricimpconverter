'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get(function (req, res){
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if(initNum === 'invalid number' && initUnit === 'invalid unit'){
      res.json('invalid number and unit');
    };

    if(initUnit === 'invalid unit'){
      res.json('invalid unit');
    };

    if(initNum === 'invalid number'){
      res.json('invalid number');
    };

    let responseObject = {};
    responseObject['initNum'] = initNum;
    responseObject['initUnit'] = initUnit;
    responseObject['returnNum'] = returnNum;
    responseObject['returnUnit'] = returnUnit;
    responseObject['string'] = string;

    res.json(responseObject);
  });

};
