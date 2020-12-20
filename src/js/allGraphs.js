/* eslint-disable no-unused-vars */
import Chart from 'chart.js';

export default function getAllDataCases() {
  fetch('https://covid19-api.org/api/timeline')
    .then(response => {
      return response.json();
    })
    .then((data) => {
      addAllGraphs(data.reverse());
    });
}

function addAllGraphs(attr) {
  const allDeaths = attr.map(item => item.total_deaths);
  const allCases = attr.map(item => item.total_cases);
  const allRecovered = attr.map(item => item.total_recovered);
  const dataTime = attr.map(item => item.last_update.substring(5, 10));
  let ctx = document.getElementById('chartAll');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dataTime,
      datasets: [{
        label: 'total cases',
        data: allCases,
        backgroundColor: 'rgba(217, 201, 28, 1)',
        borderColor: [
          'rgba(217, 201, 28, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'total deaths',
        data: allDeaths,
        backgroundColor: 'rgba(112, 21, 26, 1)',
        borderColor: [
          'rgba(112, 21, 26, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'total recovered',
        data: allRecovered,
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
