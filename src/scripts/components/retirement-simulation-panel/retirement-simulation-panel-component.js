(function(){

  function retirementSimulationPanelController($window, $location, $timeout, retirementSimulationService){
    var _public = this;

    _public.$onInit = function(){
      var settings = getUrlParams();
      $timeout(function(){
        _public.simulation = buildSimulation(settings);
        _public.simulationListHeight = getSimulationListHeight();
        _public.simulationPanelContentCssClass = 'retirement-simulation-panel-content-loaded';
      }, 1000);
    };

    function getUrlParams(){
      return $location.search();
    }

    function buildSimulation(settings){
      return retirementSimulationService.build({
        initialDeposit: parseSetting(settings.initialDeposit),
        monthlyContribution: parseSetting(settings.monthlyContribution),
        annualInterest: parseSetting(settings.annualInterest),
        annualInflation: parseSetting(settings.annualInflation),
        contributionPeriod: parseSetting(settings.contributionPeriod)
      });
    }

    function parseSetting(setting){
      return parseFloat(setting);
    }

    function getSimulationListHeight(){
      var viewportElement = getElement('viewport > div');
      var monthlyBenefitContainerElement = getElement('[data-js=monthly-benefit-container]');
      var simulationListContainerElement = getElement('[data-js=simulation-list-container]');
      var simulationListHeaderElement = getElement('[data-js=simulation-list-header]');
      var viewportHeight = getStyleNumericalProperty(viewportElement, 'height');
      var viewportPaddingTop = getStyleNumericalProperty(viewportElement, 'paddingTop');
      var monthlyBenefitContainerHeight = getStyleNumericalProperty(monthlyBenefitContainerElement, 'height');
      var simulationListContainerMarginTop = getStyleNumericalProperty(simulationListContainerElement, 'marginTop');
      var simulationListHeaderHeight = getStyleNumericalProperty(simulationListHeaderElement, 'height');
      return {
        height: [viewportHeight - viewportPaddingTop - monthlyBenefitContainerHeight - simulationListContainerMarginTop - simulationListHeaderHeight, 'px'].join('')
      };
    }

    function getElement(selector){
      return document.querySelectorAll(selector)[0];
    }

    function getStyleNumericalProperty(element, property){
      return parseFloat($window.getComputedStyle(element)[property]);
    }

    // _public.monthlyBenefitAmount = retirementSimulationService.getMonthlyBenefitAmount();
  }

  app.component('retirementSimulationPanel', {
    templateUrl: 'components/retirement-simulation-panel/retirement-simulation-panel-template.html',
    controller: ['$window', '$location', '$timeout', 'retirementSimulationService', retirementSimulationPanelController]
  });

}());
