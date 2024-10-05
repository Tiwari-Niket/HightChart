import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart3',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart3.component.html',
  styleUrl: './chart3.component.scss'
})
export class Chart3Component {
  @Input() Movies !: Movie[];
  yearRuntime = new Map<number, number>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Year on Year Runtime Change'
    },
    xAxis: {
      type: 'category',
  },
    series: [{
      name: 'Year on Year Runtime Change',
      type: 'line',
      data: []
    }]
  };

  ngOnInit(): void {
    this.Movies.forEach((movie) => {
      const year = this.yearRuntime.get(movie.year) || 0;
      this.yearRuntime.set(movie.year, movie.runtime + year);
    });

    const chartData = [];
    const yearRuntimeArray = Array.from(this.yearRuntime.entries());

    for (let i = 1; i < yearRuntimeArray.length; i++) {
      const [currentYear, currentRuntime] = yearRuntimeArray[i];
      const [previousYear, previousRuntime] = yearRuntimeArray[i - 1];

      const runtimeChange = currentRuntime - previousRuntime; 

      chartData.push({
        name: `${previousYear} - ${currentYear}`, 
        y: runtimeChange,
      });
    }

    this.chartOptions.series = [{
      name: 'Year on Year Runtime Change',
      type: 'line',
      data: chartData,
    }];
  }
}
