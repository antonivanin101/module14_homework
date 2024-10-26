const form = document.querySelector('.form');
const firstInput = document.querySelector('.firstInput');
const secondInput = document.querySelector('.secondInput');
const button = document.querySelector('.button');
const result = document.querySelector('.result');
const error = document.querySelector('.error');

firstInput.addEventListener('input', isDisabled);
secondInput.addEventListener('input', isDisabled);

function isDisabled() {
    if (firstInput.value == '' || secondInput.value == '') {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let savedSession = localStorage.getItem('images');
    if (savedSession) {
        result.innerHTML = savedSession;
    }
});

button.addEventListener('click', (e) => {
    const first = firstInput.value;
    const second = secondInput.value;

    if (first >= 1 && first <= 10 && second >= 1 && second <= 10) {
        getRequest(first, second);
    } else if ((first < 1 || first > 10) && (second >= 1 && second <= 10)) {
        error.textContent = 'Номер страницы вне диапазона от 1 до 10';
        result.innerHTML = '';
        firstInput.value = '';
        secondInput.value = '';
        isDisabled();
    } else if ((first >= 1 && first <= 10) && (second < 1 || second > 10)) {
        error.textContent = 'Лимит вне диапазона от 1 до 10';
        result.innerHTML = '';
        firstInput.value = '';
        secondInput.value = '';
        isDisabled();
    } else {
        error.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
        result.innerHTML = '';
        firstInput.value = '';
        secondInput.value = '';
        isDisabled();
    }
});

function getRequest(page, limit) {
    let reqUrl = ` https://jsonplaceholder.typicode.com/photos?_page=${page}&limit=${limit}`;
    console.log(reqUrl);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', reqUrl, true);
    xhr.onload = function () {
        const response = JSON.parse(xhr.response);
        let content = ``;
        localStorage.clear();
        for (let item of response) {
            content += `<img class="image" src="${reqUrl}">`;
        }
        localStorage.setItem('images', content);
        result.innerHTML = content;
    };
    xhr.send();
    error.textContent = '';
    firstInput.value = '';
    secondInput.value = '';
    isDisabled();
}

