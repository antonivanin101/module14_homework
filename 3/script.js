const input = document.querySelector("#input");
const button = document.querySelector("button");
const output = document.querySelector("#output");

button.addEventListener('click', () => {
  useRequest(`https://jsonplaceholder.typicode.com/photos?_limit=${input.value}`, displayResult);
})

function useRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);

      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

function displayResult(apiData) {
  if(input.value < 1 || input.value > 10){
      output.innerHTML = "число вне диапазона от 1 до 10";
      return;
  }
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img src="${item.download_url}"class="card-image"/>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  output.innerHTML = cards;
}