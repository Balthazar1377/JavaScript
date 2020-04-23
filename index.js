'use strict';
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');
    start.disabled = true; 

    let appData = {
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        expensesMonth: 0,
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        // check: function () {
        //     let check = start.setAttribute('disabled', 'true'),
        //         uncheck = start.setAttribute('disabled', 'false');
        //     if (salaryAmount.value === '') {
        //         start = check;
        //     } else {
        //         start = uncheck;
        //     }

        // },
        check: function () {
            if (salaryAmount.value === '') {
                start.disabled = true;
            } else {
                start.disabled = false;
            }
        },
        start: function () {
            appData.budget = +salaryAmount.value;
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            appData.getRange();
            appData.showResult();
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcPeriod();
            periodSelect.addEventListener('input', appData.getIncomePeriodValue);
        },
        addExpensesBlock: function() {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function(item){
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        addIncomeBlock: function() {
            let cloneIncomeItem = incomeItem[0].cloneNode(true);
            incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItem = document.querySelectorAll('.income-items');
            if(incomeItem.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getIncome: function () {
            incomeItem.forEach(function(item){
                let incomeTitle = item.querySelector('.income-title').value;
                let incomeAmount = item.querySelector('.income-amount').value;
                if(incomeTitle !== '' && incomeAmount !== '') {
                    appData.income[incomeTitle] = incomeAmount;
                }
            });
            for (let key in appData.income) {
                appData.incomeMonth += appData.income[key];
            }
        },
        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getRange: function () {
            let x = periodSelect.value;
            periodAmount.innerHTML = x;
        },
        getIncomePeriodValue: function () {
            let x = periodSelect.value * appData.budgetMonth;
            incomePeriodValue.value = x; 
        },
        getInfoDeposit: function () {
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            if (appData.deposit) {
                appData.percentDeposit = prompt('Какой годовой процент?', "10");
                appData.moneyDeposit = prompt('Какая сумма заложена', 100000);
            }
        },
        getExpensesMonth: function () {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }
        },
        getBudget: function () {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        },
        getTargetMonth: function () {
            return targetAmount.value / appData.budgetMonth;
        },
        getStatusIncome: function () {
            if (appData.budgetDay > 800) {
                return ('Высокий уровень дохода');
            } else if (appData.budgetDay > 300) {
                return ('Средний уровень дохода');
            } else if (appData.budgetDay > 0) {
                return ('Низкий уровень дохода');
            } else {
                return ('Что-то пошло не так!');
            }
        },
        calcPeriod: function () {
            return appData.budgetMonth * periodSelect.value;
        }
    };
    salaryAmount.addEventListener('input', appData.check);
    // salaryAmount.addEventListener('input', appData.check);
    start.addEventListener('click', appData.start);
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', appData.getRange);
    // let bind = appData.start.bind(appData);
    // bind();