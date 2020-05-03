'use strict';
const start = document.getElementById('start'),
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
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.getElementById('cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
    start.disabled = true;


let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'); 

    class AppData {
        constructor(){
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
        }
    

    check () {
        if (salaryAmount.value === '') {
            start.disabled = true;
        } else {
            start.disabled = false;
        }
    }

    start () {
        console.log(this);
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        this.getRange();
        this.showResult();
    }

    cancel () {
        const block = document.querySelectorAll('input');
        block.forEach(item => {
            item.disabled = true;
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
        expensesPlus.disabled = true;
        incomePlus.disabled = true;
    }
    reset () {
        const reset = document.querySelectorAll('input');
        reset.forEach(item => {
            item.disabled = false;
            item.value = '';
        });
        start.style.display = 'block';
        cancel.style.display = 'none';
        start.disabled = true;
        expensesPlus.disabled = false;
        incomePlus.disabled = false;
        periodSelect.value = 1;
        periodAmount.innerHTML = periodSelect.value;
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
    }
    showResult () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', this.getIncomePeriodValue);
    }
    addExpensesBlock () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    addIncomeBlock () {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getExpInc () {
        const count = item => {
            const starStr = item.className.split('-')[0];
            console.log(starStr);
            const itemTitle = item.querySelector(`.${starStr}-title`).value;
            const itemAmount = item.querySelector(`.${starStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== '') {
                this[starStr][itemTitle] = itemAmount;
            }
        };
        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses () {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(item =>{
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    getRange () {
        const x = periodSelect.value;
        periodAmount.innerHTML = x;
    }
    getIncomePeriodValue () {
        const x = periodSelect.value * this.budgetMonth;
        incomePeriodValue.value = x; 
    }
    getInfoDeposit () {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    getExpensesMonth () {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getBudget () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + (+this.incomeMonth) - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }
    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome () {
        if (this.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (this.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (this.budgetDay > 0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!');
        }
    }
    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    
    changePer () {
        if (isNaN(depositPercent.value) || depositPercent.value > 100 || depositPercent.value < 0) {
            alert('Введите коректное значение процента под депозит!');
            start.disabled = true;
            salaryAmount.disabled = true;
        } else {
            start.disabled = false;
            salaryAmount.disabled = false;
        }
    }

    changePercent () {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
        }
    }

    depositHandler () {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositBank.value = '';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListeners () {
        salaryAmount.addEventListener('input', this.check.bind(this));
        start.addEventListener('click', this.start.bind(this));
        start.addEventListener('click', this.cancel.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.getRange.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        depositPercent.addEventListener('change', this.changePer.bind(this));
        periodSelect.addEventListener('change', () => {
            periodAmount.innerHTML = periodSelect.value;
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}

    const appData = new AppData();
    appData.eventListeners();