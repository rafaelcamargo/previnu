(function(){

  function retirementSimulationFormController($timeout, $location){
    var _public = this;

    _public.settings = [
      {
        title: 'Aplicação Inicial',
        type: 'initialDeposit',
        amount: {
          min: 1000,
          max: 50000,
          step: 500,
          current: 0,
          symbol: 'currency',
          precision: 2
        }
      },{
        title: 'Contribuição Mensal',
        type: 'monthlyContribution',
        amount: {
          min: 300,
          max: 5000,
          step: 100,
          current: 0,
          symbol: 'currency',
          precision: 2
        }
      },{
        title: 'Rentabilidade Anual',
        type: 'annualInterest',
        amount: {
          min: 3,
          max: 20,
          step: 0.5,
          current: 14,
          symbol: 'percent',
          precision: 1
        }
      },{
        title: 'Inflação Anual',
        type: 'annualInflation',
        amount: {
          min: 1,
          max: 20,
          step: 0.5,
          current: 10,
          symbol: 'percent',
          precision: 1
        }
      },{
        title: 'Período de Contribuição',
        type: 'contributionPeriod',
        amount: {
          min: 5,
          max: 50,
          step: 0.5,
          current: 30,
          symbol: 'year',
          precision: 1
        }
      }];

      _public.simulate = function(){
        var params = buildUrlParams();
        $location.path('simulation').search(params);
      };

      function buildUrlParams(){
        var params = {};
        for (var i = 0; i < _public.settings.length; i++){
          var setting = _public.settings[i];
          params[setting.type] = setting.amount.current;
        }
        return params;
      }

      $timeout(function(){
        _public.settings[0].amount.current = 5000;
        _public.settings[1].amount.current = 800;
      }, 50);
  }

  app.component('retirementSimulationForm', {
    templateUrl: 'components/retirement-simulation-form/retirement-simulation-form-template.html',
    controller: ['$timeout', '$location', retirementSimulationFormController]
  });

}());
