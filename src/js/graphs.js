/* eslint-disable no-unused-vars */
import Chart from 'chart.js';
import moment from 'moment';

export default class Graph {
  constructor() {
    this.today = moment().format().substring(0, 10);
  }

  getData(country, param) {
    fetch(`https://api.covid19api.com/total/country/${country}/status/${param || 'confirmed'}?from=2020-03-01T00:00:00Z&to=${this.today}`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.getCountryStats(data);
      });
  }

  getCountryStats(attr) {
    const dataDeath = attr.map((item) => item.Cases);
    const dataTime = attr.map((item) => item.Date.substr(5, 5));
    let ctx = document.getElementById('chart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataTime,
        datasets: [{
          label: 'total cases',
          data: dataDeath,
          backgroundColor: 'rgba(250,250,250,1)',
          borderColor: [
            'rgba(150,150,150,0.8)'
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
