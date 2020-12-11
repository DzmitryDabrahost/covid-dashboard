export default class Country {
  constructor() {
    
  }

  getDataCountry() {
    fetch('https://corona.lmao.ninja/v2/countries')
      .then(response => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}
