const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach((input) => {



        input.addEventListener('keypress', function (e) {

            // костыль на решение автозаполнения
            if (input.value.match(/[a-z]/i)) {
                input.value = '';
            }

            // диапазон русских букв, а также вдруг пользователь захочет ввести цифры
            // флаги на регистр и глобальный поиск (всю строку)
            if (e.key.match(/[^а-яё 0-9]/gi)) { // ^ - в регулярке означает начало ввода, ё нужно указать отдельно
                e.preventDefault(); // перестает печатать ненужные символы
            }
        });

    });
};

export default checkTextInputs;
