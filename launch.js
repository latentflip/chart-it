'use strict';
const cp = require('child_process');
var electron = require('electron-prebuilt');

class Chart {
  constructor(chart) {
    this.child = cp.spawn(electron, [`${__dirname}/index.js`], { stdio: ['ipc', 'pipe', 'pipe'] });
    if (chart) {
      this.drawChart(chart);
    }
  }

  drawChart(chart) {
    this.child.send({ type: 'renderChart', payload: chart });
  }
}

module.exports = Chart;
module.exports.createChart = function (chart) {
  return new Chart(chart);
}
