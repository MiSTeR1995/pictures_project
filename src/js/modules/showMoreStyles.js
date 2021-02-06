import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper ) => {
    const btn = document.querySelector(trigger);

    // cards.forEach(card => {
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach((card) => {
    //         // сначала при переборе удалим классы скрытия
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         // теперь нужно добавить нужные классы
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });

    //     // удаляем кнопку после клика
    //     btn.remove();
    // });

    // т.к. получаем данные с базы данных, то в самой верстке можно поудалять скрытые блкои
    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles') // можно обратится к assets/db.json. Тогда ниже нужно будет обращаться к res.style
            .then((res) => createCards(res))
            .catch((error) => errorMessage());

            // чтобы сработал контекст вызова и сослаться именно на кликнутую кнопку, то в колбек нужно передавать
            // не стрелочную функцию, а классическую  и в своем контексте она ссылается на тот элемент, где произошло событие
        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            // нужно создать блок для каждой отдельной карточки
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href="${link}">Подробнее</a>
                </div>
            `;

            // после создания карточки нужно добавить ее не страницу
            document.querySelector(wrapper).appendChild(card);
        });
    }

    function errorMessage () {
        let message = document.createElement('div');
        message.innerHTML = `Что-то пошло не так...`;
        message.style.cssText = `
            margin: 0 auto;
            width: 200px;
        `;
        let wrap;
        wrap = wrapper.split(' ')[0];
        document.querySelector(wrap).appendChild(message);

    }


};

export default showMoreStyles;
