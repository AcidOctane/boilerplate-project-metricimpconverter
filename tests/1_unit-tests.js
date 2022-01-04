const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function(){

    test('Whole number input', function(done){
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    // test('Decimal input', function(done){
    //   done();
    // });
    test('Invalid number', function(done){
      let input = '3/2.7/4L';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    })

  });

  suite('Function convertHandler.getUnit(input)', function(){

    test('For Each Valid Unit Inputs', function(done){
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele){
        assert.equal(convertHandler.getUnit(32 + ele), ele)
      });
      done();
    });

    test('Unknown unit input', function(done){
      let input = '32g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    })
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function(){

    test('For Each Valid Unit Inputs', function(done){
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i){
          assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });

      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function(){

    test('For Each Valid Unit Inputs', function(done){
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function(){

    test('Gal to L', function(done){
      let input = [5, 'gal'];
      let expect = 18.9271;
      assert.approximately(parseFloat(convertHandler.convert(input[0], input[1])), expect , 0.1);
      done();
    });

    test('L to Gal', function(done){
      let input = [5, 'l'];
      let expected = 1.32086;
      assert.approximately(parseFloat(convertHandler.convert(input[0], input[1])), expected, 0.1);
      done();
    });

    test('LBS to KG', function(done){
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(parseFloat(convertHandler.convert(input[0], input[1])), expected, 0.1);
      done();
    });

    test('KG to LBS', function(done){
      let input = [5, 'kg'];
      let expected = 11.0231;
      assert.approximately(parseFloat(convertHandler.convert(input[0], input[1])), expected, 0.1);
      done();
    });

    test('MI to KM', function(done){
      let input = [5, 'mi'];
      let expected = 8.04672;
      assert.approximately(parseFloat(convertHandler.convert(input[0], input[1])), expected, 0.1);
      done();
    });

    test('KM to MI', function(done){
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(parseFloat(convertHandler.convert(input[0], input[1])), expected, 0.1);
      done();
    });
  });
});
