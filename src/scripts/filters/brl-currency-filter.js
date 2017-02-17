(function(){

  function brlCurrencyFilter($filter){

    return function(number, symbol, precision){
      symbol = symbol || '';
      precision = precision || 2;
      amount = $filter('commaDecimal')(number, precision);
      return [symbol, amount].join(' ');
    };

  }

  app.filter('brlCurrency', ['$filter', brlCurrencyFilter]);

}());
