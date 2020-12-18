import moment from 'moment';
import { handleData } from './mapInstance/mapInstance';
import { getDataByCountry } from './mapInstance/overallStats';
import sortedHundlers from './sortedHundlers';

export default class Country {
  constructor() {
    this.mainList = document.querySelector('.left-column-list-content');
    this.allCountry = [];
  }

  getDataCountry() {
    fetch('https://corona.lmao.ninja/v2/countries')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.createAllCountryItemsList(data);
      });
  }

  createAllCountryItemsList(data) {
    data.forEach(element => {
      const item = {
        // eslint-disable-next-line no-underscore-dangle
        id: element.countryInfo._id,
        updated: element.updated,
        name: element.country,
        country: element.countryInfo.iso2,
        flag: element.countryInfo.flag,
        latitude: element.countryInfo.lat,
        longitude: element.countryInfo.long,
        population: element.population,
        cases: element.cases,
        deaths: element.deaths,
        recovered: element.recovered,
        todayCases: element.todayCases,
        todayDeaths: element.todayDeaths,
        todayRecovered: element.todayRecovered
      };
      this.allCountry.push(item);
    });
    const lastUpdated = moment(this.allCountry[0].updated).subtract('days').calendar();
    document.querySelector('.stats-heading__subtitle').textContent = `Updated: ${lastUpdated}`;
    handleData(this.allCountry);
    sortedHundlers(this.allCountry);
    getDataByCountry(this.allCountry.sort((a, b) => b.cases - a.cases));
  }
}
