/* eslint-disable no-param-reassign */
import Graph from '../graphs';

const chart = new Graph();

function getOverallStats(data) {
  const tabQs = document.querySelectorAll('.tabQ');
  tabQs.forEach((item, i) => item.innerText = data[i]);
}

function getDataByCountry(data) {
  const countriesContainer = document.querySelector('.countriesContainer');
  countriesContainer.innerHTML = '';
  const toggle = document.querySelector('.toggle-last-day-item').classList.contains('item-on');
  data.forEach((item, index) => {
    const country = document.createElement('div');
    const countryAttr = document.createElement('div');
    const countryName = document.createElement('div');
    const countryFlag = document.createElement('img');
    countryFlag.setAttribute('src', '');
    countryFlag.src = item.flag;
    countryFlag.setAttribute('alt', `${item.country} flag`);
    const countryStats = document.createElement('div');
    countryStats.classList.add('countryStats');
    const countryCases = document.createElement('div');
    const countryDeaths = document.createElement('div');
    const countryRecoveries = document.createElement('div');
    country.classList.add('country');
    countryAttr.classList.add('countryAttr');
    countryName.classList.add('countryName');
    countryFlag.classList.add('countryFlag');
    countryCases.classList.add('countryCases');
    countryDeaths.classList.add('countryDeaths');
    countryRecoveries.classList.add('countryRecoveries');
    countryName.innerText = `${index + 1}. ${item.name}`;
    countryCases.innerText = `Cases: ${toggle ? item.todayCases : item.cases}` || '0';
    countryDeaths.innerText = `Deaths: ${toggle ? item.todayDeaths : item.deaths}` || '0';
    countryRecoveries.innerText = `Recovered: ${toggle ? item.todayRecovered : item.recovered}` || '0';

    countryAttr.append(countryFlag, countryName);
    countryStats.append(countryCases, countryDeaths, countryRecoveries);
    country.append(countryAttr, countryStats);
    countriesContainer.append(country);
  });
  fillPopupWithData(data);
}

function fillPopupWithData(data) {
  const country = document.querySelectorAll('.country');
  const popupCountryName = document.querySelector('.dataPopUp__country');
  const dataPopUp = document.querySelector('.dataPopUp');
  const dataItemCases = document.querySelector('.data-item__cases');
  const dataItemDeaths = document.querySelector('.data-item__deaths');
  const dataItemRecoveries = document.querySelector('.data-item__recoveries');
  const dataItemToday = document.querySelector('.data-item__today');
  country.forEach((item, i) => {
    const {
      cases, deaths, name, recovered, todayCases, todayDeaths, todayRecovered, population
    } = data[i];
    item.addEventListener('click', () => {
      dataPopUp.classList.add('dataPopUp--active');
      popupCountryName.innerText = name;
      dataItemCases.children[0].innerText = `Overall cases: ${cases}`;
      dataItemCases.children[1].innerText = `Today cases: ${todayCases}`;
      dataItemCases.children[2].innerText = `Cases 100k people(cut): ${Math.round(cases / (population / 100000)) || 0}`;

      dataItemDeaths.children[0].innerText = `Death cases: ${deaths}`;
      dataItemDeaths.children[1].innerText = `Today Death cases: ${todayDeaths}`;
      dataItemDeaths.children[2].innerText = `Death cases 100k people(cut): ${Math.round(deaths / (population / 100000)) || 0}`;

      dataItemRecoveries.children[0].innerText = `Recovery cases: ${recovered}`;
      dataItemRecoveries.children[1].innerText = `Today Recovery cases: ${todayRecovered}`;
      dataItemRecoveries.children[2].innerText = `Recovery cases 100k people(cut): ${Math.round(recovered / (population / 100000)) || 0}`;

      dataItemToday.children[0].innerText = `Today cases 100k people(cut): ${Math.round(todayCases / (population / 100000)) || 0}`;
      dataItemToday.children[1].innerText = `Today Deaths 100k people(cut): ${Math.round(todayDeaths / (population / 100000)) || 0}`;
      dataItemToday.children[2].innerText = `Today Recovered 100k people(cut): ${Math.round(todayRecovered / (population / 100000)) || 0}`;
      chart.getData(name);
    });
  });
  closePopUp(dataPopUp);
}

function closePopUp(dataPopUp) {
  const closePopUpElem = document.querySelector('.closePopUp');
  closePopUpElem.addEventListener('click', () => {
    dataPopUp.classList.remove('dataPopUp--active');
  });
}

function openCloseAdds(target, manager, textInitial, textUpdate) {
  const elem = document.querySelector(manager);
  const item = document.querySelector(target);
  elem.addEventListener('click', () => {
    item.classList.toggle(`${target.substring(1)}--active`);
    if (item.classList.contains(`${target.substring(1)}--active`)) {
      elem.innerText = textUpdate;
    } else {
      elem.innerText = textInitial;
    }
  });
}
openCloseAdds('.dataPopUp__graphic', '.dataPopUp__bottom', 'More', 'Less');
openCloseAdds(
  '.overAllChartContainer',
  '.overAllChartOpen',
  'Open Overall Chart >>',
  'Close Overall Chart <<'
);

function openCloseKeyboard() {
  const keyboardIcon = document.querySelector('.keyboard-icon');
  const keyboard = document.querySelector('.virtual-keyboard');
  const closeBtn = document.querySelector('.closeBtn');
  keyboardIcon.addEventListener('click', () => {
    keyboard.classList.add('virtual-keyboard--active');
  });
  closeBtn.addEventListener('click', () => {
    keyboard.classList.remove('virtual-keyboard--active');
  });

}
openCloseKeyboard();

export { getOverallStats, getDataByCountry };
