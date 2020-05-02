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

    const AppData = function () {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.expensesMonth = 0;
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    };

    AppData.prototype.check = function () {
        if (salaryAmount.value === '') {
            start.disabled = true;
        } else {
            start.disabled = false;
        }
    };

    AppData.prototype.start = function () {
        console.log(this);
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getRange();
        this.showResult();
    };

    AppData.prototype.cancel = function () {
        const block = document.querySelectorAll('input');
        block.forEach(function(item) {
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
        expensesPlus.disabled = true;
        incomePlus.disabled = true;
    };
    AppData.prototype.reset = function () {
        const reset = document.querySelectorAll('input');
        reset.forEach(function(item) {
            item.disabled = false;
            item.value = '';
        });
        start.style.display = 'block';
        cancel.style.display = 'none';
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
    };
    AppData.prototype.showResult = function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', this.getIncomePeriodValue);
    };
    AppData.prototype.addExpensesBlock = function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    };
    AppData.prototype.getExpenses = function() {
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };
    AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    };
    AppData.prototype.getIncome = function () {
        const _this = this;
        incomeItem.forEach(function(item){
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if(incomeTitle !== '' && incomeAmount !== '') {
                _this.income[incomeTitle] = incomeAmount;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    AppData.prototype.getAddExpenses = function () {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getAddIncome = function() {
        const _this = this;
        console.log(this);
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };
    AppData.prototype.getRange = function () {
        let x = periodSelect.value;
        periodAmount.innerHTML = x;
    };
    AppData.prototype.getIncomePeriodValue = function () {
        let x = periodSelect.value * this.budgetMonth;
        incomePeriodValue.value = x; 
    };
    AppData.prototype.getInfoDeposit = function () {
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if (this.deposit) {
            this.percentDeposit = prompt('Какой годовой процент?', "10");
            this.moneyDeposit = prompt('Какая сумма заложена', 100000);
        }
    };
    AppData.prototype.getExpensesMonth = function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    AppData.prototype.getBudget = function () {
        this.budgetMonth = this.budget + (+this.incomeMonth) - +this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    };
    AppData.prototype.getTargetMonth = function () {
        return targetAmount.value / this.budgetMonth;
    };
    AppData.prototype.getStatusIncome = function () {
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!');
        }
    };
    AppData.prototype.calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    };

    AppData.prototype.eventListeners = function () {
        salaryAmount.addEventListener('input', this.check.bind(this));
        start.addEventListener('click', this.start.bind(this));
        start.addEventListener('click', this.cancel.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.getRange.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
    
        periodSelect.addEventListener('change', function() {
            periodAmount.innerHTML = periodSelect.value;
        });
    };

    const appData = new AppData();
    appData.eventListeners();