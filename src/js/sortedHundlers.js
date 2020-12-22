import { getDataByCountry } from './mapInstance/overallStats';

export default function sortedHundlers(data) {
  const sortCountries = document.querySelector('.sortCountries');
  sortCountries.addEventListener('click', (e) => {
    viewSorted(data, e.target);
  });
}

function viewSorted(data, target) {
  const toggle = document.querySelector('.toggle-last-day-item').classList.contains('item-on');
  if (target.matches('.sortCountries__var--yellow')) {
    if (toggle) getDataByCountry(data.sort((a, b) => b.todayCases - a.todayCases));
    else getDataByCountry(data.sort((a, b) => b.cases - a.cases));
  }
  if (target.matches('.sortCountries__var--blueGrey')) {
    if (toggle) getDataByCountry(data.sort((a, b) => b.todayDeaths - a.todayDeaths));
    else getDataByCountry(data.sort((a, b) => b.deaths - a.deaths));
  }
  if (target.matches('.sortCountries__var--green')) {
    if (toggle) getDataByCountry(data.sort((a, b) => b.todayRecovered - a.todayRecovered));
    else getDataByCountry(data.sort((a, b) => b.recovered - a.recovered));
  }
}
