import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css', '../../Admin.component.css'],

})
export class DashboardHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  chart: any;

  chartOptionsTable = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Income And Expenses',
    },
    axisY: {
      title: 'Number of Auctions',
      includeZero: true,
    },
    axisY2: {
      title: 'Total Revenue',
      includeZero: true,
      labelFormatter: (e: any) => {
        var suffixes = ['', 'K', 'M', 'B'];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1) order = suffixes.length - 1;

        var suffix = suffixes[order];
        return '$' + e.value / Math.pow(1000, order) + suffix;
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: 'pointer',
      itemclick: function (e: any) {
        if (
          typeof e.dataSeries.visible === 'undefined' ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
    },
    data: [
      {
        type: 'column',
        showInLegend: true,
        name: 'Revenue',
        axisYType: 'secondary',
        yValueFormatString: '$#,###',
        dataPoints: [
          { label: 'Jan', y: 250000 },
          { label: 'Feb', y: 431000 },
          { label: 'Mar', y: 646000 },
          { label: 'Apr', y: 522000 },
          { label: 'May', y: 464000 },
          { label: 'Jun', y: 470000 },
          { label: 'Jul', y: 534000 },
          { label: 'Aug', y: 407000 },
          { label: 'Sep', y: 484000 },
          { label: 'Oct', y: 465000 },
          { label: 'Nov', y: 424000 },
          { label: 'Dec', y: 231000 },
        ],
      },
      {
        type: 'spline',
        showInLegend: true,
        name: 'No of Orders',
        dataPoints: [
          { label: 'Jan', y: 372 },
          { label: 'Feb', y: 412 },
          { label: 'Mar', y: 572 },
          { label: 'Apr', y: 224 },
          { label: 'May', y: 246 },
          { label: 'Jun', y: 601 },
          { label: 'Jul', y: 642 },
          { label: 'Aug', y: 590 },
          { label: 'Sep', y: 527 },
          { label: 'Oct', y: 273 },
          { label: 'Nov', y: 251 },
          { label: 'Dec', y: 331 },
        ],
      },
    ],
  };

  chartOptionsCircle = {
	  animationEnabled: true,
	  title: {
		text: "Sales by Categories"
	  },
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 14.1, name: "Toys" },
		  { y: 28.2, name: "Electronics" },
		  { y: 14.4, name: "Groceries" },
		  { y: 43.3, name: "Furniture" }
		]
	  }]
	}
}
