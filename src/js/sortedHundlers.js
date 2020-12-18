import { getDataByCountry } from './mapInstance/overallStats';

export default function sortedHundlers(data) {
  const container = document.querySelector('.tabsContainer');

  container.addEventListener('click', (e) => {
    const target = e.target.children[0].textContent;
    const titleTarget = target.substring(0, target.length - 1).toLowerCase();
    viewSorted(data, titleTarget);
  });
}

function viewSorted(data, titleTarget) {
  switch (titleTarget) {
    case 'deaths':
      getDataByCountry(data.sort((a, b) => b.deaths - a.deaths));
      break;
    case 'cases':
      getDataByCountry(data.sort((a, b) => b.cases - a.cases));
      break;
    case 'recovered':
      getDataByCountry(data.sort((a, b) => b.recovered - a.recovered));
      break;
    default:
  }
}
