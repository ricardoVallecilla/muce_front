import { Component, OnInit } from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: [
    './dashboard-default.component.css'
  ]
})
export class DashboardDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AmCharts.makeChart('statistics-chart', {
      type: 'serial',
      marginTop: 0,
      hideCredits: true,
      marginRight: 80,
      dataProvider: [{
        year: 'Jan',
        value: 0.98
      }, {
        year: 'Feb',
        value: 1.87
      }, {
        year: 'Mar',
        value: 0.97
      }, {
        year: 'Apr',
        value: 1.64
      }, {
        year: 'May',
        value: 0.4
      }, {
        year: 'Jun',
        value: 2.9
      }, {
        year: 'Jul',
        value: 5.2
      }, {
        year: 'Aug',
        value: 0.77
      }, {
        year: 'Sap',
        value: 3.1
      }],
      valueAxes: [{
        axisAlpha: 0,
        dashLength: 6,
        gridAlpha: 0.1,
        position: 'left'
      }],
      graphs: [{
        id: 'g1',
        bullet: 'round',
        bulletSize: 9,
        lineColor: '#4680ff',
        lineThickness: 2,
        negativeLineColor: '#4680ff',
        type: 'smoothedLine',
        valueField: 'value'
      }],
      chartCursor: {
        cursorAlpha: 0,
        valueLineEnabled: false,
        valueLineBalloonEnabled: true,
        valueLineAlpha: false,
        color: '#fff',
        cursorColor: '#FC6180',
        fullWidth: true
      },
      categoryField: 'year',
      categoryAxis: {
        gridAlpha: 0,
        axisAlpha: 0,
        fillAlpha: 1,
        fillColor: '#FAFAFA',
        minorGridAlpha: 0,
        minorGridEnabled: true
      },
      'export': {
        enabled: true
      }
    });
  }

  onTaskStatusChange(event) {
    const parentNode = (event.target.parentNode.parentNode);
    parentNode.classList.toggle('done-task');
  }

}

function getRandomData() {
  let data = [];
  const totalPoints = 300;
  if (data.length > 0) {
    data = data.slice(1);
  }

  while (data.length < totalPoints) {
    const prev = data.length > 0 ? data[data.length - 1] : 50;
    let y = prev + Math.random() * 10 - 5;
    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }
    data.push(y);
  }

  const res = [];
  for (let i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }
  return res;
}
