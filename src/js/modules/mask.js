const mask = (selector) =>{
    let setCursorPosition = (pos, elem) => {
        // при срабатывании этой функции будет устанавливаться фокус на элементе
        elem.focus();

        // полифил для старых браузеров
        if (elem.setSelectionRange) { // для новых у которых есть этот метод
            elem.setSelectionRange(pos, pos); // если в нач и конеч позицию передать одно и тоже, то курсор уст. в опр. позицию
        } else if (elem.createTextRange) { // для старых браузеров с таким методом
            let range = elem.createTextRange(); // диапазон который нужно выделить на основе этого метода

            range.collapse(true); // объединение граничных точек диапазона 1 с последней
            range.moveStart('character', pos); // установка начальной точки выделения
            range.moveEnd('character', pos); // установка конечной точки
            range.select(); // установим курсор и выделим то значение на основе тех параметров
        }
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __'; // матрица для создания маски
        let i = 0;
        // статичное значение работает на основе матрицы
        let def = matrix.replace(/\D/g, ''); // заменяем все не цифры через регулярное выражение
        // динамичное значение, работает на основе введенных пользователем данных
        let val = this.value.replace(/\D/g, ''); // обращение к контексту и использование его value

        // контролируем количество цифр. Вдруг если пользователь захочет удалить +7, то просто не дадим ему это сделать
        if (def.length >= val.length) {
            val = def;
        }

        // значение которое ввел пользователь прямо сейчас
        // в replace передаем callback который выполнится для каждого элемента матрица (т.к через регулярку перебираем все)
        this.value = matrix.replace(/./g, function (a) {
            // условием проверяем меньше ли итератор чем количество символов в уже обработанной строке
            // если это так, то из функции возвращаем сам символ и увеличит итератор
            // а если больше, то ставим пустую строку
            // если и это условие не выполнилось, то просто возвращаем символ пришедший в функцию
            return /[_\d]/.test(a) && i < val.length // является ли данный символ элементом из определенного диапазона
                ? val.charAt(i++)
                : i >= val.length
                ? ''
                : a;
        });

        // Отображение маски при фокусе или блюре
        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            // установка курсора куда нужно
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        // когда сработает событие, то включится функция createMask
        input.addEventListener('input', createMask);
        // тоже самое для фокуса и блюра
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;
