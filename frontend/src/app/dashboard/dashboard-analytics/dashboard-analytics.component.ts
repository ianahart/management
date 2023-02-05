import { Component, OnInit } from '@angular/core';
import { DashboardClassService } from '../dashboard-class.service';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
})
export class DashboardAnalyticsComponent implements OnInit {
  constructor(private dashboardClassService: DashboardClassService) {}
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    {
      data: [],
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0'],
      label: 'Popular Classes',
    },
  ];

  ngOnInit(): void {
    this.dashboardClassService.chartsClass().subscribe(
      (response) => {
        for (const stat of response.bar_chart_data) {
          const [key] = Object.keys(stat);
          const [value] = Object.values(stat);
          this.barChartLabels.push(key);
          this.barChartData[0].data.push(value as any);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
