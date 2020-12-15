import moment from 'moment';

const headerTotalDeath = document.querySelector('.header-death-count');
const globalTotalCount = document.querySelector('.main-total-count');
const footerDate = document.querySelector('.footer-date-count');
const rightColumnDeath = document.querySelector('.right-column-total-title');
const rightColumnTotalCount = document.querySelector('.right-column-total-count');

function getSummaryDataCovid(data) {
  setTimeout(() => {
    footerDate.textContent = `${moment(data[0].updated).format('DD MMM YYYY')}`;
    const totalDeath = data.reduce((acc, cur) => acc + cur.deaths, 0);
    const totalCases = data.reduce((acc, cur) => acc + cur.cases, 0);
    headerTotalDeath.append(totalDeath);
    globalTotalCount.append(totalCases);
    rightColumnDeath.textContent = 'Global Death';
    rightColumnTotalCount.textContent = totalDeath;
    const sortData = data.sort((a, b) => b.deaths - a.deaths);
    createTemplate(sortData);
  }, 1500);
}

function createTemplate(data) {
  const countryList = document.querySelector('.right-column-total-list');
  data.forEach((item, index) => {
    const template = `
      <div class="right-column-item">
        <div class="right-country">
          <p class="right-number">${index + 1}. </p>
          <p class="right-country-name">${item.name}</p>
        </div>
        <p class="right-death">${item.deaths}</p>
      </div>
    `;
    countryList.insertAdjacentHTML('beforeend', template);
  });
}

export default getSummaryDataCovid;
