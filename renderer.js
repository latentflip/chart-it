'use strict';

const Chart = require('chart.js');
const Dygraph = require('dygraphs');

const elements = {
  'dygraphs': document.querySelector('#dygraph'),
  'chart.js': document.querySelector('#chart')
}

const showHideElements = (which) => {
  for (const key of Object.keys(elements)) {
    if (key === which) {
      elements[key].style.display = 'block';
    } else {
      elements[key].style.display = 'none';
    }
  }
}

require('electron').ipcRenderer.on('renderChart', function(event, message) {

  switch (message.engine) {
    case 'dygraphs':
    case 'dygraph': {
      showHideElements('dygraphs');
      const chart = new Dygraph(elements['dygraphs'], message.chart.data, message.chart.options || {});
      window.addEventListener('resize', () => {
        chart.resize();
      });
      break;
    }

    case 'chart.js': {
      showHideElements('chart.js');
      const ctx = elements['chart.js'].getContext('2d');
      console.log(message.chart);
      const myChart = new Chart(ctx, message.chart);
      break;
    }
  }

  //var myChart = new Chart(ctx, {
  //    type: message.type || 'bar',
  //    data: {
  //        labels: message.datasets[0].data.map((_, i) => i + 1),
  //        datasets: message.datasets
  //    },
  //    options: {
  //        scales: {
  //            yAxes: [{
  //                ticks: {
  //                    beginAtZero:true
  //                }
  //            }]
  //        }
  //    }
  //});
});
