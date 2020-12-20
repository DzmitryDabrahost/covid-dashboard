/* eslint-disable no-unused-vars */
import Chart from 'chart.js';
import moment from 'moment';

export default class Graph {
  constructor() {
    this.today = moment().format().substring(0, 10);
  }

  getData(country) {
    const confirmed = new Promise((resolve, reject) => {
      fetch(`https://api.covid19api.com/total/country/${country}/status/confirmed?from=2020-03-01T00:00:00Z&to=${this.today}`)
        .then(response => {
          resolve(response.json());
        });
    });
    const deaths = new Promise((resolve, reject) => {
      fetch(`https://api.covid19api.com/total/country/${country}/status/deaths?from=2020-03-01T00:00:00Z&to=${this.today}`)
        .then(response => {
          resolve(response.json());
        });
    });
    const recovered = new Promise((resolve, reject) => {
      fetch(`https://api.covid19api.com/total/country/${country}/status/recovered?from=2020-03-01T00:00:00Z&to=${this.today}`)
        .then(response => {
          resolve(response.json());
        });
    });

    Promise.all([confirmed, deaths, recovered])
      .then(data => {
        this.getCountryStats(data);
      });
  }

  getCountryStats(attr) {
    const dataConfirmed = attr[0].map((item) => item.Cases);
    const dataDeath = attr[1].map((item) => item.Cases);
    const dataRecovered = attr[2].map((item) => item.Cases);
    const dataTime = attr[0].map((item) => item.Date.substring(5, 10));
    let ctx = document.getElementById('chart');
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataTime,
        datasets: [{
          label: 'Confirmed',
          data: dataConfirmed,
          backgroundColor: 'rgba(217, 201, 28, 1)',
          borderColor: [
            'rgba(217, 201, 28, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Deaths',
          data: dataDeath,
          backgroundColor: 'rgba(112, 21, 26, 1)',
          borderColor: [
            'rgba(112, 21, 26, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Recovered',
          data: dataRecovered,
          backgroundColor: 'rgba(32, 168, 13, 1)',
          borderColor: [
            'rgba(32, 168, 13, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
  }
}
