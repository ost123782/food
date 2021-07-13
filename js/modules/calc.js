function calculator () {
    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, weight, age, ratio = 1.375;
    

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            return;
        }

        if (sex === "female") {
            result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 *height) - (4.3 *age)) *  ratio);
        } else {
            result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 *height) - (5.7 *age)) *  ratio);
        }
        localStorage.setItem('callories', result.textContent);
    }

    calcTotal();

    function getStaticInformation (parentSelector, activeClass)  {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        localStorage.setItem('ratio', ratio);
        localStorage.setItem('sex', sex);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
        
                console.log(ratio, sex);
        
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);
                calcTotal();
            });    
        });

    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicinf (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)){
                input.style.border = '3px solid red';
            } else{
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                case 'weight':
                     weight = +input.value;
                     localStorage.setItem('weight', weight);
                    break;
                case 'age':
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
                
            }
            calcTotal();
        });
    }
    getDynamicinf('#height');
    getDynamicinf('#weight');
    getDynamicinf('#age');
}

module.exports = calculator;