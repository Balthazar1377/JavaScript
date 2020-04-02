'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm(Boolean('Есть ли у вас депозит в банке?')),
    income = 300,
    mission = 1500,
    period = 1;

let start = function(){
    do{
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

const showTypeOf = function(data){
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

let expenses = [];

const getExpensesMonth = function(){
    let sum = 0;
    for (let i = 0; i < 3; i++){  
        let amount = 0; 
        expenses[i] = prompt('Введите обязательную статью расходов');
        do {
            amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));
        sum += +amount;
    } 
    console.log(expenses);
    return sum;
};
const expensesAmount = getExpensesMonth();

console.log('Расходы за месяц ' + expensesAmount);

const getAccumulatedMonth = function(){
    return money - expensesAmount;
};

const budgetDay = Math.floor(getAccumulatedMonth() / 30);
console.log('Ваш бюджет на день:' + budgetDay);

const getStatusIncome = function(){
    if (budgetDay >= 1200){
        alert('У вас высокий уровень дохода');
    } else if (budgetDay < 1200 && budgetDay >= 600){
        alert('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0){
        console.log('К сожалению, ваш уровень дохода ниже среднего');
    } else {
        alert('Что-то пошло не так');    
    }
};
getStatusIncome();

const getTargetMonth = function(){
    return Math.ceil(mission / getAccumulatedMonth());
};
if (getTargetMonth() >= 0) {
    console.log('Цель будет достигнута через ' + getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}


