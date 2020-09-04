window.addEventListener('DOMContentLoaded', () => {
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabItem = document.querySelectorAll('.tabheader__item'),
          tabContainer = document.querySelector('.tabcontainer');
    
    const removeActive = (arr) => {
        arr.forEach(item => {
            item.style.display = 'none';
        });
    };
    removeActive(tabContent);

    const removeActiveItem = (item) => {
        item.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    

    const addActive = (item) => {
        item.style.display = 'block';
    };

    const addTabContent = (item, content) => {
        item.forEach((item, i) => {
            if(item.classList.contains('tabheader__item_active')) {
                addActive(content[i]);
            }
        });
    };
    addTabContent(tabItem, tabContent);
 

    tabContainer.addEventListener('click', (e) => {
        removeActive(tabContent);
        removeActiveItem(tabItem);
        e.target.classList.add('tabheader__item_active');
        addTabContent(tabItem, tabContent);

    });

    
    

});