function openModal(modalSelector, modalTimerId, scroll) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // отступ с учетом скролла
    document.body.style.marginRight = `${scroll}px`;

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector, windows) {
    const modal = document.querySelector(modalSelector);

    closeAllModals(windows);

    modal.style.display = 'none';
    document.body.style.marginRight = `0px`;

}

function closeAllModals(windows) {
    // закрытие всех модальых окон на странице, когда их вызвано несколько
    windows.forEach((item) => {
        item.style.display = 'none';

        // добавление классов анимации для окон
        item.classList.add('animated', 'fadeIn');

    });

    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
}

const modal = () => {

    let btnPressed = false; // для отслеживания клика на триггер

    // destroy - вкл\выкл уничтожение тригера
    const bindModal = (triggerSelector, modalSelector, closeSelector, modalTimerId, destroy = false) => {
        const trigger = document.querySelectorAll(triggerSelector); // псевдомассив триггеров
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const windows = document.querySelectorAll('[data-modal]'); // все модальные окна со страницы
        const scroll = calcScroll();

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); // отключение действий по умолчанию у элемента
                }

                btnPressed = true; // когда кликнули на кнопку

                if (destroy) {
                    item.remove();
                }

                closeAllModals(windows);
                openModal(modalSelector, modalTimerId, scroll);
            });
        });

        // закрытие по крестику
        close.addEventListener('click', () => {
            closeModal(modalSelector, windows);
        });

        // закрытие по нажатию на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modalSelector, windows);
            }
        });

        // закрытие по клавише esc
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && window.getComputedStyle(modal).display === 'block') {
                closeModal(modalSelector, windows);
            }
        });
    };

    // подсчет размера скролла
    function calcScroll() {
        let div = document.createElement('div');

        // чтобы провести расчеты, нужно чтобы он существовал на странице
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        // Теперь вычисляем сам размер прокрутки
        let scrollWidth = div.offsetWidth - div.clientWidth; // полная ширина - ширина с padding и главным контентом(без скролла)

        // теперь можно удалить блок
        div.remove();
        return scrollWidth;
    }

    // функция для открытия модального окна, после того как пользователь долистал до конца страницы и не кликнул на триггер
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {

            // для совместимости с другими браузерами
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight );

            if (
                !btnPressed &&
                // pageYOffset - отлистано px сверху. clientHeight - контент, который видно сейчас.
                // scrollHeight - полная высота страницы. Последние два включают в себя только padding
                window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1
            ) {
                document.querySelector(selector).click(); // вызов события вручную (как-будто кликнули по окну)
            }
        });
    }


    const modalTimerId = setTimeout(() => {
        // сюда также нужно поместить расчет скролла, потому что колбек не может взять значение извне
        const scroll = calcScroll();
        openModal('.popup-consultation', modalTimerId, scroll);
    }, 20000);

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close', modalTimerId);

    // кнопка подробнее об услуге
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close', modalTimerId);

    // вызов подарка, если отмотали до самого низа
    openByScroll('.fixed-gift');

    // клик на подарок
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', modalTimerId, true);
};

export default modal;
export { closeModal };
export { closeAllModals };
export { openModal };
