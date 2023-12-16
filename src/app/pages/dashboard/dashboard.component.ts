import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChartOptions } from 'src/app/demo/chart/apex-chart/apex-chart.component';
import { ApiService } from 'src/app/services/api.service';
import { VinculacionesXState } from 'src/app/models/interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private apiService = inject(ApiService);

  barSimpleChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Canceladas',
        data: [1, 1, 1, 0, 0, 0, 0, 0, 0],
      },
      {
        name: 'Finalizadas',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: 'En proceso',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: "rounded"
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
      ],
    },
    yaxis: {
      title: {
        text: 'Vinculaciones',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' Vinculaciones';
        },
      },
    },
  };

  donutChart: Partial<ChartOptions>;

  Vinculacionestotal = 0;

  ngOnInit(): void {
    const donutSeries = [];
    const donutLabels = [];
    this.apiService.getDashboard().subscribe({
      next: (data: VinculacionesXState[]) => {
        data.forEach((value) => {
          const total = value.total;
          donutLabels.push(value._id);
          donutSeries.push(value.total);
          this.Vinculacionestotal += value.total;
        });

        this.donutChart = {
          chart: {
            type: 'donut',
            width: '100%',
            height: 350,
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            pie: {
              customScale: 0.8,
              donut: {
                size: '75%',
              },
              offsetY: 20,
            },
          },
          colors: ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
          series: [...donutSeries],
          labels: [...donutLabels],
          legend: {
            position: 'left',
            offsetY: 80,
          },
        };
      },
    });
  }
}
