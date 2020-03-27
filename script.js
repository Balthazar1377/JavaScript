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