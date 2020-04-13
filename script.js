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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let itemIncome = 0,
            cashIncome = 0;
        if(confirm('Есть ли у Вас дополнительный источник заработка?')) {
             do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?');
             } while (isNumber(itemIncome) || itemIncome === null || itemIncome.trim().length <= 0);
             do {
                cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
             } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses;
        do {
             addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        } while (addExpenses === null);
        appData.addExpenses = addExpenses.split(', ');
        let forArray = appData.addExpenses.map(function(exp) {
            return exp.charAt(0).toUpperCase() + exp.substr(1);
        });
        console.log(forArray);
        appData.deposit = confirm(Boolean('Есть ли у вас депозит в банке?'));
            for (let i = 0; i < 2; i++){  
                let amount = 0,
                    expense = 0; 
                do {
                    expense = prompt('Введите обязательную статью расходов');
                } while (isNumber(expense) || expense === null || expense.trim().length <= 0);
                do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount)); 
                appData.expenses[expense] = amount; 
            }  
            console.log(appData.expenses);
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do {
            appData.percentdeposit = prompt('Какой годовой процент?');
            } while (!isNumber(appData.percentDeposit));
            do {
            appData.moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
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