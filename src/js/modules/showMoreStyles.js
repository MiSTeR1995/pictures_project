const showMoreStyles = (trigger, styles) => {
    const cards = document.querySelectorAll(styles);
    const btn = document.querySelector(trigger);

    cards.forEach(card => {
        card.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach((card) => {
            // сначала при переборе удалим классы скрытия
            card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            // теперь нужно добавить нужные классы
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        });

        // удаляем кнопку после клика
        btn.remove();
    });
};

export default showMoreStyles;
