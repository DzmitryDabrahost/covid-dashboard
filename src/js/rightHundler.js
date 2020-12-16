const title = document.querySelector('.right-column-total-title');
const count = document.querySelector('.right-column-total-count');
const countryList = document.querySelector('.right-column-total-list');

function rightColumnClickedHundler(data) {
  const rightSlider = document.querySelector('.right-column-slider');
  const rightSliderLinks = [...document.querySelectorAll('.right-column-global-link')];

  rightSlider.addEventListener('click', (e) => {
    const block = document.querySelector('.right-column-total-content');
    const target = e.target;
    rightSliderLinks.forEach(item => {
      item.classList.remove('border-top');
    });
    target.classList.add('border-top');
    if (target.innerText === 'Global recovery') {
      block.classList.add('color-green');
      createDomRecovery(data);
    } else {
      block.classList.remove('color-green');
      createDomDeaths(data);
    }
  });
}

function createDomDeaths(data) {
  title.textContent = 'Global Death';
  const allCountDeaths = data.reduce((acc, cur) => acc + cur.deaths, 0);
  count.innerText = allCountDeaths;
  const sortData = data.sort((a, b) => b.deaths - a.deaths);
  const newData = [];
  sortData.forEach(element => {
    const item = {
      country: element.name,
      count: element.deaths,
      today: element.todayDeaths
    };
    newData.push(item);
  });
  createTemplate(newData);
}

function createDomRecovery(data) {
  title.textContent = 'Global Recovery';
  const allCountRecovered = data.reduce((acc, cur) => acc + cur.recovered, 0);
  count.innerText = allCountRecovered;
  const sortData = data.sort((a, b) => b.recovered - a.recovered);
  const newData = [];
  sortData.forEach(element => {
    const item = {
      country: element.name,
      count: element.recovered,
      today: element.todayRecovered
    };
    newData.push(item);
  });
  createTemplate(newData);
}

function createTemplate(data) {
  countryList.innerHTML = '';
  data.forEach((item, index) => {
    const template = `
      <div class="right-column-item">
        <div class="right-country">
          <p class="right-number">${index + 1}. </p>
          <p class="right-country-name">${item.country}</p>
        </div>
        <p class="right-death-last-day">${item.today}</p>
        <p class="right-death">${item.count}</p>
      </div>
    `;
    countryList.insertAdjacentHTML('beforeend', template);
  });
}

export default rightColumnClickedHundler;
