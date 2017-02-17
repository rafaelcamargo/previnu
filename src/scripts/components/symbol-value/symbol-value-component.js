(function(){

  app.component('symbolValue', {
    templateUrl: 'components/symbol-value/symbol-value-template.html',
    transclude: true,
    bindings: {
      symbol: '@'
    }
  });

}());
