'use strict';
const money = prompt('Ваш месячный доход?'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm(Boolean('Есть ли у вас депозит в банке?')),
    income = 300,
    mission = 1500,
    period = 1;

const showTypeOf = function(data){
    console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.split(', '));

const expenses01 = prompt('Введите обязательную статью расходов'),
    amount01 = +prompt('Во сколько это обойдется?'),
    expenses02 = prompt('Введите обязательную статью расходов'),
    amount02 = +prompt(' Во сколько это обойдется?');

const getExpensesMonth = function(){
    return amount01 + amount02;
};
console.log('Расходы за месяц ' + getExpensesMonth());

const getAccumulatedMonth = function(){
    return money - getExpensesMonth();
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
console.log('Срок достижения цели ' + getTargetMonth() + ' месяцев');



