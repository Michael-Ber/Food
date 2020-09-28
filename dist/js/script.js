window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabItem = document.querySelectorAll('.tabheader__item'),
          tabParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });
        tabItem.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    hideTabContent();

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');
        tabItem[i].classList.add('tabheader__item_active');
    }

    showTabContent();

    tabParent.addEventListener('click', (e) => {
        let target = e.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabItem.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    let deadline = '2020-09-20';

    function getRemainingTime(endtime) {
        let t = new Date(endtime) - Date.now(),
            days = Math.floor((t/(24*60*60*1000))),
            hours = Math.floor((t/(60*60*1000))%24),
            minutes = Math.floor((t/(60*1000))%60),
            seconds = Math.floor((t/(1000))%60);
        
        return {
            'total': t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function addDateToPage(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'), 
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerID = setInterval(addTextContent, 1000);
        
        addTextContent();
        
        function addTextContent () {
            let a = getRemainingTime(endtime);
            days.textContent = a.days < 10 ? `0${a.days}` : a.days;
            hours.textContent = a.hours < 10 ? `0${a.hours}` : a.hours;
            minutes.textContent = a.minutes < 10 ? `0${a.minutes}` : a.minutes;
            seconds.textContent = a.seconds < 10 ? `0${a.seconds}` : a.seconds;
            if(a.total <= 0) {
                clearInterval(timerID);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }
    addDateToPage('.timer', deadline);

    console.log(document.body.scrollHeight);

    //Modal window

    const btns = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
    

    btns.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    window.addEventListener('keyup', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    window.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal') || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    }); 

   
    let timerID = setTimeout(showModal, 500000);

    window.addEventListener('scroll', showModalByScroll);
    
     
    function showModal() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(timerID);
    }
    
    
    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    function showModalByScroll () {
        if(document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    //Work with class

    class Card {
        constructor(parent, img, alt, title, text, cost, ...classes) {
            this.parent = document.querySelector(parent);
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.cost = cost;
            this.classes = classes;
            this.koef = 27;
            this.changeValutaToUSD();
        }

        changeValutaToUSD() {
            this.cost = this.cost * this.koef; 
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0) {
                this.classes = 'menu__item'; 
                element.classList.add(this.element);
            } else  {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }
            element.innerHTML = `
                <img src="${this.img}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${Math.floor(this.cost)}</span> грн/день</div>
                </div>   
            `;
            this.parent.append(element);
        }
    }

    const getData = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status : ${res.status}`);
        }
        return await res.json();
    };

    getData('http://localhost:3000/menu')
        .then(data => data.forEach(({img, altimg, title, descr, price}) => {
            new Card('.menu__field .container',img, altimg, title, descr, price, 'menu__item').render();
        }))



   //Server

    const forms = document.querySelectorAll('form');
 
    const messageBox = {
       'loading': "img/form/spinner1.gif",
       'success': "Спасибо, скоро мы с вами свяжемся",
       'failure': "Что-то пошло не так"
    };

    forms.forEach(form => {
	   bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        })
        return await res.json();
    };

    function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const spinner = document.createElement('img');
			spinner.src = messageBox.loading;
			spinner.style.cssText = `
					display: block;
					margin: 10px auto 0 auto;	
					max-width: 20px;
			`;
			form.insertAdjacentElement("afterend", spinner);

			let formData = new FormData(form);
			let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(response => {
					showThanksModal(messageBox.success);
					spinner.remove();
					console.log(response);
				}).finally(() => {
					form.reset();
				}).catch(() => {
					showThanksModal(messageBox.failure);
				})

		});
    }

    function showThanksModal(message) {
	    const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        const thanksModalDialog = document.createElement('div');
        thanksModalDialog.classList.add('modal__dialog');
        thanksModalDialog.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
	    `;
	    modal.append(thanksModalDialog);
	    setTimeout(() => {
            thanksModalDialog.remove();	  
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
            closeModal();
		}, 4000)
    }

    // Carousel

    const current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slider = document.querySelector('.offer__slider'),
          slides = document.querySelectorAll('.offer__slide'),
          wrapper = document.querySelector('.offer__slider-wrapper'),
          track = document.querySelector('.offer__slider-track'),
          width = window.getComputedStyle(wrapper).width,
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next');

    const dots = document.createElement('div');
    dots.classList.add('offer__slider-dots');
    dots.style.cssText = `
        display: flex;
        margin: 20px auto 0 auto;
    `;

    for (let i=0; i < slides.length; i++) {
        dots.innerHTML += `
            <div class="offer__slider-dot"></div>
        `;
    }
    slider.append(dots);

    const dot = document.querySelectorAll('.offer__slider-dot');
    dot.forEach(item => {
        item.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 100%;
            border: 1px solid #393939;
            margin-right: 10px;
            cursor: pointer;
        `;
    });
    
    let offset = 0,
        slideIndex = 1;
    
    slides.forEach(item => {
        item.style.minWidth = width;
    });

    track.style.width = `${slides.length * 100}%`;

    initSlider();

    next.addEventListener('click', () => {
        if(offset >= ((slides.length-1) * strToNumber(width))) {
            offset = 0;
            slideIndex = 1;
        }else {
            offset += strToNumber(width);
            slideIndex += 1;
        }
        moveSlides(slideIndex, offset, track);
        getActualPosition(slides, slideIndex-1, 'actual');
        getActualPosition(dot, slideIndex-1, 'active');
    });

    prev.addEventListener('click', () => {
        if(offset <= 0) {
            offset = (slides.length-1)*strToNumber(width);
            slideIndex = slides.length;
        }else {
            offset -= strToNumber(width);
            slideIndex -= 1;
        }
        moveSlides(slideIndex, offset, track);
        getActualPosition(slides, slideIndex-1, 'actual');
        getActualPosition(dot, slideIndex-1, 'active');
    });

    dots.addEventListener('click', (e) => {
        if(e.target && e.target.classList.contains('offer__slider-dot')) {
            dot.forEach((item, i) => {
                if(e.target == item) {
                    slideIndex = i + 1;
                    offset = strToNumber(width) * (slideIndex-1);
                    moveSlides(slideIndex, offset, track);
                    getActualPosition(dot, slideIndex-1, 'active');
                    getActualPosition(slides, slideIndex-1, 'actual');
                }
            });
        }
    });

    function initSlider() {
        moveSlides(slideIndex, offset, track);
        getTotalSlides(total, slides);
        getActualPosition(slides, slideIndex-1, 'actual');
        getActualPosition(dot, slideIndex-1, 'active');

    }

    function moveSlides (slideIndex, offset, movingTrack) {
        movingTrack.style.transform = `translateX(-${offset}px)`; 
        if(slides.length < 10) {
            current.textContent = "0" + slideIndex;
        }else {
            current.textContent = slideIndex;
        }
    }

    function getActualPosition(array, index, classActivity) {
        removeActive(array, classActivity);
        addActive(array[index], classActivity);
    }

    function getTotalSlides(className, slidesArray) {
        if(slidesArray.length < 10) {
            className.textContent = '0' + slidesArray.length;
        }else {
            className.textContent = slidesArray.length;
        }
    }

    function removeActive(array, className) {
        array.forEach(element => {
            element.classList.remove(className);
        });
    }

    function addActive(item, className) {
        item.classList.add(className);
    }

    function strToNumber(str) {
        return +str.replace(/\D/ig, '');
    }

    //Calculator

    

    const result = document.querySelector('.calculating__result span');

    let sex, ratio, height, weight, age;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    }else {
        sex = 'female';
    }
    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    }else {
        ratio = 1.375;
    }

    function initCalculator(selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(className);
            if(elem.getAttribute('id') == sex) {
                elem.classList.add(className);
            }else if(elem.getAttribute('data-ratio') == +ratio) {
                elem.classList.add(className);
            }
        })
    }

    function getStaticInformation(selector, className) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
                elements.forEach(item => {
                    item.classList.remove(className);
                });
                e.target.classList.add(className);
                calcResult();
            })
        });
    
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            if(input.value.match(/\D/ig)) {
                input.style.border = '1px solid red';
            }else {
                input.style.border = 'none';
            }
            calcResult();
        });
        
    }

    function calcResult() {
        if(!sex || !ratio || !weight || !height || !age) {
            result.textContent = '____';
            return;
        }

        if(sex == 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);  
        }else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    initCalculator('#gender div', 'calculating__choose-item_active');
    initCalculator('#activity div', 'calculating__choose-item_active');
    calcResult();
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('#activity div', 'calculating__choose-item_active');
    getDynamicInformation('#weight');
    getDynamicInformation('#height');
    getDynamicInformation('#age');

    //Experiments with classes
    
    class User {
        constructor(name, age) {
            this.name = name;
            this._age = age;
        }
        #surname = 'Bersh';

        say = () => {
            console.log(`Пользователь ${this.name}${this.#surname} возрастом: ${this._age}`);
        }

        get age() {
            return this._age;
        }

        set age (age) {
            if(typeof age === 'number' && age > 0 && age < 110) {
                this._age = age;
            }else {
                console.log('Недопустимое значение');
            }
        }
    }

    let mic = new User('Michael', 33);
    mic.say();
    console.log(mic.age);
    mic.age = 60;
    mic.say();
    console.log(mic.age);
    mic.surname = 'nebersh';
    mic.say();






    

    
    

});

