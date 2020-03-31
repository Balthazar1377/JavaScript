'use strict';
let money = 500,
    income = 300,
    addExpenses = '200$ на девушку, 100$ на себя, 50$ на книги',
    deposit = true,
    mission = 1500,
    period = 1;

console.log(typeof money );
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель: заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log(budgetDay);

// The thirst lesson

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm(Boolean('Есть ли у вас депозит в банке?'));
console.log(deposit);

const expenses01 = prompt('Введите обязательную статью расходов');
let amount01 = +prompt('Во сколько это обойдется?');
const xpenses02 = prompt('Введите обязательную статью расходов');
let amount02 = +prompt(' Во сколько это обойдется?');
const budgetMonth = money - (amount01 + amount02);
console.log('Ваш месячный бюджет:' + budgetMonth);

 const missionComplete = Math.ceil(mission / budgetMonth);
console.log('Вы достигнете цели через:' + missionComplete);

const budgetDayStrict = Math.floor(budgetMonth / 30);
console.log('Ваш бюджет на день:' + budgetDayStrict);

if (budgetDayStrict >= 1200){
    alert('У вас высокий уровень дохода');
} else if (budgetDayStrict < 1200 && budgetDayStrict >= 600){
    alert('У вас средний уровень дохода');
} else if (budgetDayStrict < 600 && budgetDayStrict >= 0){
    console.log('К сожалению, ваш уровень дохода ниже среднего');
} else {
    //Не было сказано, выводить в консоль или на экран
    alert('Что-то пошло не так');    
}



