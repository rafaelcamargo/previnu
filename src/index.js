(function(){
  const previnu = {};
  let options = {};

  previnu.init = ({
    initialBalance,
    monthlyDeposit,
    avgYearlyProfitability,
    avgYearlyInflation,
    taxes,
    desiredMonthlyIncome,
  }) => {
    updateOptions({
      initialBalance,
      monthlyDeposit,
      avgYearlyProfitability,
      avgYearlyInflation,
      taxes,
      desiredMonthlyIncome
    });
    const history = [buildInitialMonth()];
    while (getCurrentMonth(history).interests <= options.desiredMonthlyIncome) {
      const currentMonth = getCurrentMonth(history);
      adjustDesiredMonthlyIncome(currentMonth);
      adjustMonthlyDeposit(currentMonth);
      history.push(calculatePerformance(currentMonth));
    }
    return getCurrentMonth(history);
  }

  function updateOptions(newOptions){
    options = newOptions;
  }
  
  function buildInitialMonth(){
    return {
      id: 0,
      date: buildStartDate(),
      balance: options.initialBalance,
      interests: 0, 
      deposit: 0
    }
  }
  
  function calculatePerformance({
    id,
    date,
    balance
  } = {}){
    const interests = balance * getMonthlyProfitability();
    const deposit = options.monthlyDeposit;
    const newBalance = balance + interests + deposit;
    return {
      id: id + 1,
      date: incrementDate(date),
      balance: newBalance,
      interests, 
      deposit
    }
  }
  
  function incrementDate(date){
    const currentMonth = date.getMonth();
    const newYear = currentMonth == 11 ? date.getFullYear() + 1 : date.getFullYear();
    const newMonth = currentMonth < 11 ? currentMonth + 1 : 0;
    return new Date(newYear, newMonth);
  }
  
  function buildStartDate(){
    const startDate = new Date();
    return new Date(startDate.getFullYear(), startDate.getMonth());
  }
  
  function getMonthlyProfitability(){
    return (options.avgYearlyProfitability * ((100-options.taxes)/100))/12/100;
  }
  
  function getCurrentMonth(history){
    return { ...history.at(-1) }
  }
  
  function adjustDesiredMonthlyIncome(currentMonth){
    if(currentMonth.id !== 0 && currentMonth.id % 12 === 0) {
      options.desiredMonthlyIncome = options.desiredMonthlyIncome * (1 + options.avgYearlyInflation/100);
    }
  }
  
  function adjustMonthlyDeposit(currentMonth){
    if(currentMonth.id !== 0 && currentMonth.id % 12 === 0) {
      options.monthlyDeposit = options.monthlyDeposit * (1 + options.avgYearlyInflation/100);
    }
  }
  
  window.previnu = previnu;
}());
