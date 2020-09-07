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

    const days = document.querySelector('#days'), 
          hours = document.querySelector('#hours'),
          minutes = document.querySelector('#minutes'),
          seconds = document.querySelector('#seconds');
    
    const deadline = new Date('2020-09-10');

    function calcMsLeft() {
        return deadline - Date.now();
    }

    function clearDate() {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
    }
    clearDate();

    function updateCounter() {
        let timerId = setInterval(function() {
            let timeLeft = calcMsLeft(),
                daysLeft = Math.floor(timeLeft/(24*60*60*1000)),
                hoursLeft = Math.floor(timeLeft/(60*60*1000)),
                minutesLeft = Math.floor(timeLeft/(60*1000)),
                secondsLeft = Math.floor(timeLeft/1000);
            
            let daysZ = daysLeft,
                hoursZ = (hoursLeft > 24 ? (hoursLeft - (daysLeft*24)) : hoursLeft),
                minutesZ = minutesLeft > 60 ? (minutesLeft - (hoursLeft*60)) : minutesLeft,
                secondsZ = secondsLeft > 60 ? (secondsLeft - (minutesLeft*60)) : secondsLeft; 

            
            days.textContent = daysZ < 10 ? `0${daysZ}` : daysZ;
            hours.textContent = hoursZ < 10 ? `0${hoursZ}` : hoursZ;
            minutes.textContent = minutesZ < 10 ? `0${minutesZ}` : minutesZ;
            seconds.textContent = secondsZ < 10 ? `0${secondsZ}` : secondsZ;

            

        }, 1000); 
    }

    updateCounter();
    
   



    
    

});

