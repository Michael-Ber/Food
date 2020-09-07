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
   



    
    

});

