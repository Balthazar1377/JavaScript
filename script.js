'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function(){
        do{
        money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
    };
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addexpenses = addExpenses.split(', ');
        appData.deposit = confirm(Boolean('Есть ли у вас депозит в банке?'));
            for (let i = 0; i < 2; i++){  
                let amount = 0,
                    expense = 0; 
                expense = prompt('Введите обязательную статью расходов');
                do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount)); 
                appData.expenses[expense] = amount; 
            }  
            console.log(appData.expenses);
    }
};
appData.asking();

appData.getExpensesMonth = function(){
    let sum = 0;
    for (let key in appData.expenses) {
        sum += +appData.expenses[key];
        appData.expensesMonth = sum;
    }
    console.log('Расходы за месяц: ' + sum);
};
appData.getExpensesMonth();

appData.getBudget = function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.round(appData.budgetMonth / 30);
};
appData.getBudget();

appData.getStatusIncome = function(){
    if (appData.budgetDay >= 1200){
        alert('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600){
        alert('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0){
        console.log('К сожалению, ваш уровень дохода ниже среднего');
    } else {
        alert('Что-то пошло не так');    
    }
};
appData.getStatusIncome();

appData.getTargetMonth = function(){
    return Math.ceil(appData.mission / appData.budgetMonth);
};
if (appData.getTargetMonth() >= 0) {
    console.log('Цель будет достигнута через ' + appData.getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

for(let key in appData) {
    console.log('Наша программа включает в себя данные: ' + appData[key]);
}


