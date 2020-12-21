import { getDataByCountry } from './mapInstance/overallStats';

export default function createToggleCheckbox(data) {
  const toggle = document.querySelector('.toggle-last-day-item');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggle.classList.toggle('item-on');
    getDataByCountry(data.sort((a, b) => b.cases - a.cases));
  });
}
