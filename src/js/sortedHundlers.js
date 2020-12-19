import { getDataByCountry } from './mapInstance/overallStats';

export default function sortedHundlers(data) {
  const sortCountries = document.querySelector('.sortCountries');
  sortCountries.addEventListener('click', (e) => {
    viewSorted(data, e.target);
  });
}

function viewSorted(data, target) {
  if (target.matches('.sortCountries__var--yellow')) {
      getDataByCountry(data.sort((a, b) => b.cases - a.cases));
  }
  if (target.matches('.sortCountries__var--blueGrey')) {
    getDataByCountry(data.sort((a, b) => b.deaths - a.deaths));
  }
  if (target.matches('.sortCountries__var--green')) {
    getDataByCountry(data.sort((a, b) => b.recovered - a.recovered));
  }
}
