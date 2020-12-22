import { getDataByCountry, getOverallStats } from './mapInstance/overallStats';

const toggle = document.querySelector('.toggle-last-day-item');

export default function createToggleCheckbox(data) {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggle.classList.toggle('item-on');
    getDataByCountry(data.sort((a, b) => b.todayCases - a.todayCases));
    changeAllCount(data);
  });
}

function changeAllCount(data) {
  const booleanToggle = toggle.classList.contains('item-on');
  if (booleanToggle) {
    const countAllCasesToday = data.reduce((sum, cur) => sum + cur.todayCases, 0);
    const countAllDeathsToday = data.reduce((sum, cur) => sum + cur.todayDeaths, 0);
    const countAllRecoveredToday = data.reduce((sum, cur) => sum + cur.todayRecovered, 0);
    getOverallStats([countAllCasesToday, countAllDeathsToday, countAllRecoveredToday]);
  } else {
    const countAllCases = data.reduce((sum, cur) => sum + cur.cases, 0);
    const countAllDeaths = data.reduce((sum, cur) => sum + cur.deaths, 0);
    const countAllRecovered = data.reduce((sum, cur) => sum + cur.recovered, 0);
    getOverallStats([countAllCases, countAllDeaths, countAllRecovered]);
  }
}
