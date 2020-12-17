import {handleData} from './mapInstance/mapInstance';
import {getDataByCountry, filterDataByCountry} from './mapInstance/overallStats';

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
    // this.addDomTemplate();
    handleData(this.allCountry);
    getDataByCountry(this.allCountry);
  }
  // addDomTemplate() {
  //   this.allCountry.sort((a, b) => b.cases - a.cases);
  //   this.allCountry.forEach((element, index) => {
  //     const template = `
  //       <div class="left-column-item" data-id="${element.id}">
  //         <div class="list-country">
  //           <p class="list-number">${index + 1}. </p>
  //           <p class="list-flag"><img src="${element.flag}" alt="flag"></p>
  //           <p class="list-country-name">${element.name}</p>
  //         </div>
  //         <p class="list-death">${element.cases}</p>
  //       </div>
  //     `;
  //     this.mainList.innerHTML += template;
  //   });
  //   document.querySelector('.left-column-total-count').textContent = this.allCountry.length;
  // }
}

