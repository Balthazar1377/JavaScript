'use strict';

import elementClosest from 'element-closest';
elementClosest(window);
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import images from './modules/images';
import valid from './modules/valid';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('26 may 2020');

//Menu
toggleMenu();

//popup
togglePopUp();

//Tabs
tabs();

//Slider
slider();

//Our team
images();

//Validator of calc
valid();

//Calculator
calc(100);

//send-ajax-form
sendForm();