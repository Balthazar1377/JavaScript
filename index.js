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
    incomeTitle = document.getElementsByClassName('income-title')[1],
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.getElementById('cancel');
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
        check: function () {
            if (salaryAmount.value === '') {
                start.disabled = true;
            } else {
                start.disabled = false;
            }
        },
        start: function () {
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.getRange();
            this.showResult();
        },
        cancel: function () {
            salaryAmount.disabled = true;
            incomeTitle.disabled = true;
            incomeAmount.disabled = true;
            if (incomeItem.length === 2) {
                document.getElementsByClassName('income-title')[2].disabled = true;
                document.getElementsByClassName('income-amount')[1].disabled = true;
            } else if (incomeItem.length === 3) {
                document.getElementsByClassName('income-title')[2].disabled = true;
                document.getElementsByClassName('income-amount')[1].disabled = true;
                document.getElementsByClassName('income-title')[3].disabled = true;
                document.getElementsByClassName('income-amount')[2].disabled = true;
            }
            additionalIncomeItem[0].disabled = true;
            additionalIncomeItem[1].disabled = true;
            expensesAmount.disabled = true;
            expensesTitle[1].disabled = true;
            if (expensesItems.length === 2) {
                document.getElementsByClassName('expenses-title')[2].disabled = true;
                document.getElementsByClassName('expenses-amount')[1].disabled = true;
            } else if (expensesItems.length === 3) {
                document.getElementsByClassName('expenses-title')[2].disabled = true;
                document.getElementsByClassName('expenses-amount')[1].disabled = true;
                document.getElementsByClassName('expenses-title')[3].disabled = true;
                document.getElementsByClassName('expenses-amount')[2].disabled = true;
            }
            targetAmount.disabled = true;
            additionalExpensesItem.disabled = true;
            start.style.display = 'none';
            cancel.style.display = 'block';
        },
        reset: function () {
            salaryAmount.disabled = false;
            incomeTitle.disabled = false;
            incomeAmount.disabled = false;
            if (incomeItem.length === 2) {
                document.getElementsByClassName('income-title')[2].disabled = false;
                document.getElementsByClassName('income-amount')[1].disabled = false;
            } else if (incomeItem.length === 3) {
                document.getElementsByClassName('income-title')[2].disabled = false;
                document.getElementsByClassName('income-amount')[1].disabled = false;
                document.getElementsByClassName('income-title')[3].disabled = false;
                document.getElementsByClassName('income-amount')[2].disabled = false;
            }
            additionalIncomeItem[0].disabled = false;
            additionalIncomeItem[1].disabled = false;
            expensesAmount.disabled = false;
            expensesTitle[1].disabled = false;
            if (expensesItems.length === 2) {
                document.getElementsByClassName('expenses-title')[2].disabled = false;
                document.getElementsByClassName('expenses-amount')[1].disabled = false;
            } else if (expensesItems.length === 3) {
                document.getElementsByClassName('expenses-title')[2].disabled = false;
                document.getElementsByClassName('expenses-amount')[1].disabled = false;
                document.getElementsByClassName('expenses-title')[3].disabled = false;
                document.getElementsByClassName('expenses-amount')[2].disabled = false;
            }
            targetAmount.disabled = false;
            additionalExpensesItem.disabled = false;
            expensesItems.disabled = false;
            incomeItem.disabled = false;
            start.style.display = 'block';
            cancel.style.display = 'none';
            salaryAmount.value = '';
            budgetMonthValue.value = '';
            budgetDayValue.value = '';
            expensesMonthValue.value = '';
            additionalIncomeValue.value = '';
            additionalExpensesValue.value = '';
            incomePeriodValue.value = '';
            targetMonthValue.value = '';
            start.disabled = true;
            this.budget =  0;
            this.budgetDay =  0;
            this.budgetMonth =  0;
            this.income =  {};
            this.incomeMonth =  0;
            this.addIncome =  [];
            this.expenses =  {};
            this.expensesMonth =  0;
            this.addExpenses =  [];
            this.deposit =  false;
            this.percentDeposit =  0;
            this.moneyDeposit =  0;
            console.log(this);
        },
        showResult: function() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('input', this.getIncomePeriodValue);
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
                    this.income[incomeTitle] = incomeAmount;
                }
            });
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        },
        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        },
        getRange: function () {
            let x = periodSelect.value;
            periodAmount.innerHTML = x;
        },
        getIncomePeriodValue: function () {
            let x = periodSelect.value * this.budgetMonth;
            incomePeriodValue.value = x; 
        },
        getInfoDeposit: function () {
            this.deposit = confirm('Есть ли у вас депозит в банке?');
            if (this.deposit) {
                this.percentDeposit = prompt('Какой годовой процент?', "10");
                this.moneyDeposit = prompt('Какая сумма заложена', 100000);
            }
        },
        getExpensesMonth: function () {
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        },
        getBudget: function () {
            this.budgetMonth = this.budget + (+this.incomeMonth) - +this.expensesMonth;
            this.budgetDay = Math.ceil(this.budgetMonth / 30);
        },
        getTargetMonth: function () {
            return targetAmount.value / this.budgetMonth;
        },
        getStatusIncome: function () {
            if (this.budgetDay > 800) {
                return ('Высокий уровень дохода');
            } else if (this.budgetDay > 300) {
                return ('Средний уровень дохода');
            } else if (this.budgetDay > 0) {
                return ('Низкий уровень дохода');
            } else {
                return ('Что-то пошло не так!');
            }
        },
        calcPeriod: function () {
            return this.budgetMonth * periodSelect.value;
        }
    };
    salaryAmount.addEventListener('input', appData.check.bind(appData));
    start.addEventListener('click', appData.start.bind(appData));
    start.addEventListener('click', appData.cancel.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
    incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
    periodSelect.addEventListener('input', appData.getRange.bind(appData));
    cancel.addEventListener('click', appData.reset.bind(appData));