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

});

