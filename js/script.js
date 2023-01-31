window.addEventListener('DOMContentLoaded', () => {
         //Tabs

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

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
});

        //Timer

const deadLine = '2023-01-31';

function getTimeRemaining (endtime) {
    let days, hours, minutes, second;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        second = 0;
    } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)), 
        minutes = Math.floor((t / 1000 /60) % 60),
        second = Math.floor((t / 1000) % 60);
    }

 

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': second 

    };
}
function getZero(num) {
    if (num >= 0 && num < 10) {
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
          timeInteerval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero (t.days);
        hours.innerHTML = getZero (t.hours);
        minutes.innerHTML = getZero (t.minutes);
        seconds.innerHTML = getZero (t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInteerval);
        }
    }      
}

setClock('.timer', deadLine);


            // Modal
            const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

            function opnModal() {
                modal.classList.add('show');
                modal.classList.remove('hide');
                document.body.style.overflow = 'hidden';
                clearInterval(modalTimerId);
            }
    
            modalTrigger.forEach(btn => {
                btn.addEventListener('click', opnModal); {
            
                };
            });

 
    
        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            
            document.body.style.overflow = '';
        }
        
        modalCloseBtn.addEventListener('click', closeModal);
    
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) { 
                closeModal();
            }
        });

   // const modalTimerId = setTimeout(opnModal,3000);

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            opnModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    window.addEventListener('scroll', showModalByScroll );
    
    // Використовуємо класи для карточок!


    class menuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.tranfer = 37;
            this.chenngeToUAH();

        }
        chenngeToUAH() {
            this.price = this.price * this.tranfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                    <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }
  new menuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    10,
    '.menu .container'
  ).render();
});