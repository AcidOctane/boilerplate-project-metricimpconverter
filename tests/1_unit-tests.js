const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('convertHandler should correctly ', function(){

    test('read a whole number input', function(done){
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('read a decimal number input', function(done){
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2)
      done();
    });

    test('read a fractional input', function(done){
      let input ='3/2L'
      assert.equal(convertHandler.getNum(input), 3 / 2)
      done();
    });

    test('read a fractional input with a decimal', (done) => {
      let input = '2.5/3L';
      assert.equal(convertHandler.getNum(input), (2.5 / 3).toFixed(5));
      done();
    })

    test('return an error on a double-fraction', function(done){
      let input = '3/2.7/4L';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    })

    test('default to a numerical input of 1 when no numerical input is provided.', (done) => {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })

  //});

//  suite('Function convertHandler.getUnit(input)', function(){

    test('read each valid input unit', function(done){
      let input = ['gal','mi','km','lbs','kg','GAL', 'MI','KM','LBS','KG'];
      input.forEach(function(ele){
        assert.equal(convertHandler.getUnit(32 + ele), ele.toLowerCase())
      });
      done();
    });

    test('return an error for an invalid input unit', function(done){
      let input = '32g';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    })

//  });

//  suite('Function convertHandler.getReturnUnit(initUnit)', function(){

    test('return the correct return unit for each valid input unit', function(done){
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i){
          assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });

      done();
    });
//  });

//  suite('Function convertHandler.spellOutUnit(unit)', function(){

    test('return the spelled-out string unit for each valid input unit', function(done){
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = [
        "gallons",
        "litres",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ];
      input.forEach((item, i) => {
        assert.equal(convertHandler.spellOutUnit(item), expect[i]);
      done();
      });
    });
  });


  suite('convertHandler should correctly convert ', function(){

    test('Gal to L', function(done){
      let input = [5, 'gal'];
      let expect = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect , 0.1);
      done();
    });

    test('L to Gal', function(done){
      let input = [5, 'l'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('MI to KM', function(done){
      let input = [5, 'mi'];
      let expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('KM to MI', function(done){
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('LBS to KG', function(done){
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });

    test('KG to LBS', function(done){
      let input = [5, 'kg'];
      let expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
  });
});
