let inputNum01 = document.querySelector(".inputNum01");
let inputNum02 = document.querySelector(".inputNum02");
let userInfo = document.querySelector('.userInfo');

let button = document.querySelector("button");

inputNum01.onclick = function() {
    inputNum01.value = '';
}

inputNum02.onclick = function() {
    inputNum02.value = '';
}

const useRequest = () => {
  return fetch(`https://dummyimage.com/${+inputNum01.value}x${+inputNum02.value}`)
    .then((response) => {
      return response.url;
    })
    .catch(() => { console.log('error') });
}


button.addEventListener('click', async () => {
  console.log('start');
  if ( (+inputNum01.value <= 300 && +inputNum01.value >= 100) && (+inputNum02.value <= 300 && +inputNum02.value >= 100) ) {
      const requestResult = await useRequest();
      userInfo.innerHTML = `<img src='${requestResult}' alt="<картинка>" />`;
    console.log('requestResult', requestResult);
  } else {
    console.log('одно из чисел вне диапазона от 100 до 300');
    userInfo.innerHTML = '<p>одно из чисел вне диапазона от 100 до 300</p>';
  };
  console.log('end');
});