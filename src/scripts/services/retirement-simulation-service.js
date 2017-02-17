(function(){

  app.service('retirementSimulationService', [
    '$window',
    function($window){

      var _public = {};

      var NUMBER_OF_MONTHS_IN_YEAR = 12;
      var DEFAULT_DATE_FORMAT = 'MMM \'YY';
      var balance = 0;
      var monthlyContribution = 0;
      var monthlyBenefitAmount = 0;

      _public.build = function(settings){
        var transactions = [];
        var period = getContributionPeriodInMonths(settings.contributionPeriod);
        var monthlyProfitability = getMonthlyProfitability(settings.annualInterest, settings.annualInflation);

        balance = settings.initialDeposit;
        for (var i = 0; i < period; i++)
          transactions.push(buildMonthDetails(i, settings, monthlyProfitability));

        return transactions;
      };

      _public.getMonthlyBenefitAmount = function(){
        return monthlyBenefitAmount;
      };

      function getContributionPeriodInMonths(contributionPeriodInYears){
        return contributionPeriodInYears * NUMBER_OF_MONTHS_IN_YEAR;
      }

      function getMonthlyProfitability(interest, inflation){
        return (interest / NUMBER_OF_MONTHS_IN_YEAR) / 100;
      }

      function buildMonthDetails(month, settings, monthlyProfitability){
        var contribution = getMonthlyContribution(month, settings);
        var profit = getMonthlyProfit(month, monthlyProfitability);
        var balance = calculateBalance(month, contribution, profit);
        return {
          date: buildMonthDate(month),
          monthlyContribution: contribution,
          monthlyProfit: profit,
          balance: balance
        };
      }

      function buildMonthDate(month){
        return moment().add(month, 'months').toDate();
      }

      function getMonthlyContribution(month, settings){
        if(!monthlyContribution)
          monthlyContribution = settings.monthlyContribution;
        else
          monthlyContribution = adjustMonthlyContribution(month, monthlyContribution, settings);

        return month ? monthlyContribution : 0;
      }

      function adjustMonthlyContribution(month, monthlyContribution, settings){
        if(month && month % NUMBER_OF_MONTHS_IN_YEAR === 0)
          return monthlyContribution * (1 + settings.annualInflation / 100);
        return monthlyContribution;
      }

      function getMonthlyProfit(month, monthlyProfitability){
        return month ? balance * monthlyProfitability : 0;
      }

      function calculateBalance(month, contribution, profit){
        if(month)
          balance += profit + contribution;
        return balance;
      }

      return _public;

  }]);

}());
