import { Component, Input } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-chart4',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart4.component.html',
  styleUrl: './chart4.component.scss'
})
export class Chart4Component {
  @Input() Movies !: Movie[];
  lanRuntime = new Set<string>();
  yearOnYearGenreLangRuntime = new Map<string, number>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Year on Year Genre & Lang Runtime Change'
    },
    series: []
  };

  ngOnInit(): void {
    this.Movies.forEach((movie) => {
      const genres = movie.genre.split(',');
      genres.forEach((data) => {
        const key = `${data.trim()}-${movie.language}-${movie.year}`;
        this.lanRuntime.add(key);
      });
    });

    this.Movies.forEach((movie) => {
      const genres = movie.genre.split(',');
      genres.forEach((data) => {
        const key = `${data.trim()}-${movie.language}-${movie.year}`;
        const runtime = this.yearOnYearGenreLangRuntime.get(key) || 0;
        this.yearOnYearGenreLangRuntime.set(key, runtime + movie.runtime);
      });
    });

    const yearRuntimeArray = Array.from(this.yearOnYearGenreLangRuntime.entries()).sort();
    
    let chartData = [];
    for (let i = 1; i < yearRuntimeArray.length; i++) {
      const [current, currentRuntime] = yearRuntimeArray[i];
      const [previous, previousRuntime] = yearRuntimeArray[i - 1];
      const first = current.split('-');
      const second = previous.split('-');
      if (first[0] == second[0] && first[1] == second[1]) {
        const runtimeChange = currentRuntime - previousRuntime;

        chartData.push({
          name: `${previous} - ${current}`,
          y: runtimeChange,
        });
      } else {
        this.chartOptions.series?.push(
          {
            name: `${first[0]}-${first[1]}`,
            type: 'line',
            data: chartData,
          }
        );
        chartData=[];
      }
    }
  }
}