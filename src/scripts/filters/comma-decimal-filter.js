(function(){

  function commaDecimalFilter($filter){

    return function(number, precision){
      precision = precision || 0;
      number = $filter('number')(number, precision);
      return number
        .replace(/\./g,'DECIMAL')
        .replace(/,/g,'.')
        .replace(/DECIMAL/g,',');
    };

  }

  app.filter('commaDecimal', ['$filter', commaDecimalFilter]);

}());
