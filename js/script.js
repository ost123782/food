window.addEventListener('DOMContentLoaded', () => {
//tabs
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabsContent.forEach(item => {
        item.style.display = 'none';
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}
    function showTabContent(i = 0) {
         tabsContent[i].style.display = 'block';
         tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item){ 
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2022-1-1';

    function getTimeR(endtime) {
        const tim = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(tim / (1000 * 60 * 60 * 24)),
        hours = Math.floor((tim / (1000 * 60 * 60) % 24));
        minutes = Math.floor((tim / 1000 / 60 ) % 60),
        seconds = Math.floor((tim / 1000) % 60);

        return {
            'total': tim,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds 
        };
     }

    function getZero (num) {
        if (num <= 0 || num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              promotion = document.querySelector('.promotion'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeR(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                promotion.innerHTML = "";
            }
        }
    }

    setClock('.timer', deadline);

    //modal

    const modal = document.querySelector('.modal'),
          modalBtn = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('.modal__close');


        function addModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function remModal(){
            modal.style.display = 'none';
            document.body.style.overflow = 'visible';
        }

        function addtimeModal(){
            if(modal.style.display === 'block'){
                clearInterval(timeModal);
            } else {
                addModal();
            }
        }

        modalBtn.forEach( (btn) => {
            btn.addEventListener('click', () => {
                addModal();
            });
        });

        modalClose.addEventListener('click', () => {
            remModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal){
                remModal();
            }
        });

        modal.addEventListener('wheel', (e) => {
            if (e.target === modal){
                remModal();
            }
        });

        function addScrollModal () {
            if(window.pageYOffset + document.documentElement.clientHeight == document.documentElement.scrollHeight){
                addModal();
                window.removeEventListener("scroll", addScrollModal);
            }
        }

        // const timeModal = setTimeout(addtimeModal, 3000);
        

        window.addEventListener('scroll', addScrollModal);

        //db 

        const getFromDb = async (url) => {
            const res = await fetch(url);

            if(!res.ok){
                throw new Error(`Failed to get fetch from ${url}, status: ${res.status}`);
            }

            return await res.json();
        }

        const conMenu = document.querySelector('#conMenu');

        class newElement {
            constructor(title, description, price, sorc, alt){
                this.title = title;
                this.description = description;
                this.price = price;
                this.sorc = sorc;
                this.alt = alt;
            }

            addToPage(){
                conMenu.innerHTML += `<div class="menu__item">
        <img src=${this.sorc} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    </div>`;
            }
        }


       getFromDb('http://localhost:3000/menu')
       .then(data => {
           data.forEach(({title, descr, price, img, altimg}) => {
               new newElement(title, descr, price, img, altimg).addToPage();
           });
       });

    //    new newElement("Фитнес", "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 229, "img/tabs/vegy.jpg", "vegy").addToPage();
        
        //formToServer

        const forms = document.querySelectorAll('form');
        const message = {
            loading: "loading",
            succes: "succes",
            fail: "fail"
        }

        forms.forEach(item => {
            dataPost(item);
        })

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                     'Content-type' : 'application/json'
                },
                body: data
            });
            return await res.json(); 
        } 

        function dataPost(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const statusMessage = document.createElement("div");
                statusMessage.classList.add("status");
                statusMessage.textContent = message.loading;
                form.append(statusMessage);
            const formdata = new FormData(form);
            const object = {};

            formdata.forEach(function(value, key){
                object[key] = value;
            });
            postData('http://localhost:3000/requests', JSON.stringify(object)) 
            .then( (data) => {
                console.log(data);
                statusMessage.textContent = message.succes;
                setTimeout(() => {statusMessage.remove()}, 2000);
            }).catch(() => {
                statusMessage.textContent = message.fail;
                setTimeout(() => {statusMessage.remove()}, 2000);
            }).finally( () =>{
                form.reset();
            })
            })
        }

        //Slider

        const slides = document.querySelectorAll('.offer__slide'),
              slider  = document.querySelector('.offer__slider'),
              slidePrev = document.querySelector('.offer__slider-prev'), 
              slideNext = document.querySelector('.offer__slider-next'),
              current = document.querySelector('#current'),
              total = document.querySelector('#total'),
              slidesWrapper = document.querySelector('.offer__slider-wrapper'), 
              slidesField = document.querySelector('.offer__slider-inner'),
              width = window.getComputedStyle(slidesWrapper).width;
        let slideIndex = 1;
        let offset = 0;

        checkSlider();

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;
        });

        slider.style.position = 'relative';

        const indicators = document.createElement('ol'),
              dots = [];
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
        `;

        slider.append(indicators);

        for (let i = 0; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer; 
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            `;
            indicators.append(dot);
            dots.push(dot);
        }

        function showDots () {
            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;
        }

        

        

        slideNext.addEventListener('click', () => {
            
            if (offset == +width.slice(0, width.length - 2) *(slides.length - 1)){
                offset = 0;
                slideIndex = 1;
            } else {
                offset += +width.slice(0, width.length - 2);
                slideIndex++;
            }
            checkSlider();
            slidesField.style.transform = `translateX(-${offset}px)`;
            showDots();
        });

        slidePrev.addEventListener('click', () => {
            
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) *(slides.length - 1);
                slideIndex = slides.length;
             } else {
                offset -= +width.slice(0, width.length - 2);
                slideIndex--;
             }
             checkSlider();
             slidesField.style.transform = `translateX(-${offset}px)`;
             showDots();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = +width.slice(0, width.length - 2) * (slideTo - 1);

                slidesField.style.transform = `translateX(-${offset}px)`;
                checkSlider();
                showDots();
            });
        })

        // showSldes(slideIndex);
        function checkSlider() {
            if (slides.length < 10){
                total.textContent = `0${slides.length}`;
            } else {
                total.textContent = slides.length;
            }
    
            if (slideIndex < 10) {
                        current.textContent = `0${slideIndex}`;
                    } else {
                        current.textContent = slideIndex;
            }
            
        }

       //calc 

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
});