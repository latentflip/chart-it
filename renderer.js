'use strict';

const chart = require('chart.js');
const canvas = document.querySelector('#chart');
const ctx = canvas.getContext('2d');

require('electron').ipcRenderer.on('renderChart', function(event, message) {
  message.datasetes
  console.log(message);  // Prints "whoooooooh!"
  var myChart = new Chart(ctx, {
      type: message.type || 'bar',
      data: {
          labels: message.datasets[0].data.map((_, i) => i + 1),
          datasets: message.datasets
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
});
