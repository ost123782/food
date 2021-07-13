function slider () {
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
}

module.exports = slider;