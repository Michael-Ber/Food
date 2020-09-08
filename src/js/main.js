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
          modal = document.querySelector('.modal'),
          close = modal.querySelector('[data-close]');
    

    btns.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    close.addEventListener('click', closeModal);

    window.addEventListener('keyup', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    window.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal')) {
            closeModal();
        }
    });

   
    let timerID = setTimeout(showModal, 14000);

    console.log(document.documentElement.scrollTop);
    window.addEventListener('scroll', showModalByScroll);
    
     
    function showModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(timerID);
    }
    
    
    function closeModal() {
        modal.classList.toggle('show');
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
        constructor(parent, img, alt, title, text, cost, valuta) {
            this.parent = document.querySelector(parent);
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.cost = cost;
            this.valuta = valuta;
            this.koef = 27;
            this.changeValutaToUSD();
        }

        changeValutaToUSD() {
            this.cost = this.cost / this.koef; 
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML += `
                <div class="menu__item">
                    <img src="img/tabs/${this.img}.jpg" alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${Math.floor(this.cost)}</span> длр/день</div>
                    </div> 
                </div>    
            `;
            this.parent.append(element);
        }
    }

    const vegy = new Card(
        ('.menu__field .container'), 
        'vegy',
        'vegy', 
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        229,
        'rub'
        );
    vegy.render();

   const elite = new Card(
       ('.menu__field .container'), 
       'elite',
       'elite',
       'Меню "Премиум"',
       'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
       550,
       'grn'
       );
   elite.render(); 

   const post = new Card(
       ('.menu__field .container'), 
       'post',
       'post',
       'Меню "Постное"',
       'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
       430,
       'grn'
   );
   post.render();



    

   



    
    

});

