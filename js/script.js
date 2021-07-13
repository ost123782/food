window.addEventListener('DOMContentLoaded', () => {

    const tabsModule = require('./modules/tabs');
    const clockModule = require('./modules/clock');
    const modalModule = require('./modules/modal');
    const fromDbModule = require('./modules/fromdatabase');
    const toDbModule = require('./modules/toDb');
    const sliderModule = require('./modules/slider');   
    const calculatorModule = require('./modules/calc');
    

    tabsModule();
    clockModule();
    modalModule();
    fromDbModule();
    toDbModule();
    sliderModule();
    calculatorModule();
});