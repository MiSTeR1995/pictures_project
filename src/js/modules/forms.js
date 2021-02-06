import {postData} from '../services/requests';

const forms = () => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    // пути, где будут размещаться данные
    const path = {
        designer: 'assets/server.php',   // путь для формы с картинкой
        question: 'assets/question.php'  // путь для формы с вопросом
    };

    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = '';
        });

        // Также нужно очистить инпут от имени загруженной картинки
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]); // у input есть свойство files, чтобы обращаться к загруженным файлам
            let dots;
            const arr = item.files[0].name.split('.');

            // разбить строку имени по точке, если в названии > 5 символов, то в переменную dots запишем ...
            arr[0].length > 6 ? dots = '...' : dots = '.';

            // теперь формируем короткое название файла
            const name = arr[0].substring(0, 6) + dots + arr[1];

            // взглянув на верстку, нам нужно получить предыдущий соседний элемент
            item.previousElementSibling.textContent = name;
        });
    });


    form.forEach((item) => {
        item.addEventListener('submit', (e) => {
            e.preventDefault(); // блок перезагрузки страницы

            // подготовка формы к отправке запроса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');

            // так как нужн скрыть форму, то блок поместить нужно в родителя формы
            item.parentNode.appendChild(statusMessage);

            // скрываем форму с анимацией
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            // Помещаем изображение спиннера на страницу
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            // текстовой сообщение
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            // сбор данных в форме через FormData
            const formData = new FormData(item);

            let api; // переменная для формирования динамического пути

            // метод пытается найти опеределенный блок, по опр. селектору где-то выше по иерархии
            // два выхода. если блок существует, то получим его. Если его нет, то false
            // если будет намного больше адресов, либо условий, то лучше использовать switch case
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then((res) => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.succes;

                    // setTimeout(() => {
                    //     closeAllModals(windows);
                    // }, 2000);
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove(); // удалить элемент со страницы

                        // вернуть форму на страницу
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeIn');
                    }, 2000);
                });
        });
    });
};

export default forms;
