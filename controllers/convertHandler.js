let inputRegex = /[a-z]+|[^a-z]+/gi
function ConvertHandler() {

  this.getNum = function(input) {

    let result;

    result = input.match(inputRegex)[0];

    //check if only unit provided
    let numberRegex = /\d/;

    if(numberRegex.test(result) === false){
      result = 1;
    }

    //check if number is a fraction
    if(result.toString().includes('/')){

      let values = result.toString().split('/');

      if(values.length != 2){

        return 'invalid number';

      }

      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      result = parseFloat((values[0]/values[1]).toFixed(5));
    };

    //check if number
    if(isNaN(result)){
      return 'invalid number';
    }

    return result;
  };

  this.getUnit = function(input) {
    let result;
    result = input.match(inputRegex)[1];

    if(!result){
      result = input.match(inputRegex)[0];
    }

    let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    if (!validUnits.includes(result)){
      return 'invalid unit';
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    if(initUnit === 'gal' || initUnit ==='GAL'){
      result = 'L';
    }else if(initUnit === 'l' || initUnit === 'L'){
      result = 'gal';
    }

    if(initUnit === 'lbs' || initUnit ==='LBS'){
      result = 'kg';
    }else if(initUnit === 'kg' || initUnit === 'KG'){
      result = 'lbs';
    }

    if(initUnit === 'mi' || initUnit ==='MI'){
      result = 'km';
    }else if(initUnit === 'km' || initUnit === 'KM'){
      result = 'mi';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if(unit === 'gal' || unit ==='GAL'){
      result = 'gallon(s)';
    }else if(unit === 'l' || unit === 'L'){
      result = 'liter(s)';
    }else if(unit === 'lbs' || unit ==='LBS'){
      result = 'pound(s)';
    }else if(unit === 'kg' || unit === 'KG'){
      result = 'kilogram(s)';
    }else if(unit === 'mi' || unit ==='MI'){
      result = 'mile(s)';
    }else if(unit === 'km' || unit === 'KM'){
      result = 'kilometre(s)';
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if(initUnit === 'gal' || initUnit ==='GAL'){
      result = (initNum * galToL).toFixed(5);
    }else if(initUnit === 'l' || initUnit === 'L'){
      result = (initNum / galToL).toFixed(5);
    }

    if(initUnit === 'lbs' || initUnit ==='LBS'){
      result = (initNum * lbsToKg).toFixed(5);
    }else if(initUnit === 'kg' || initUnit === 'KG'){
      result = (initNum / lbsToKg).toFixed(5);
    }

    if(initUnit === 'mi' || initUnit ==='MI'){
      result = (initNum * miToKm).toFixed(5);
    }else if(initUnit === 'km' || initUnit === 'KM'){
      result = (initNum / miToKm).toFixed(5);
    }


    return parseFloat(result);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };

}

module.exports = ConvertHandler;
