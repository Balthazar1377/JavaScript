'use strict';

const button = document.getElementById('#start');

const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];

const checkBox = document.querySelector('#deposit-check');

const incomeItem = document.querySelectorAll('.additional_income-item');

const disabledResult = document.querySelector('.result-total');
disabledResult.classList.remove('result-total');
console.log(disabledResult);

const valueItem = document.querySelectorAll('.result-total');
console.log(valueItem);

const otherElements = document.querySelectorAll('input');
console.log(otherElements); 

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.addiitional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');  //Тот самый range
const budgetMonthValue = document.querySelector('.budget_month-value');

