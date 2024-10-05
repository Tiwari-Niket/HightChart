import { Movie } from './../../models/movie';
import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input() Movies !: Movie[];
  MoviesByYear = new Map<number, number>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Count(No. of Movies in a year)'
    },
    series: [{
      name: 'Movies By Year',
      type: 'pie',
      data: []
    }]
  };

  ngOnInit(): void {
    this.Movies.forEach((movie) => {
      const year = movie.year;
      const currentCount = this.MoviesByYear.get(year) || 0;
      this.MoviesByYear.set(year, currentCount + 1);
    });

    const chartData = Array.from(this.MoviesByYear.entries()).map(([year, count]) => ({
      name: String(year),
      y: count,
    }));

    this.chartOptions.series = [{
      name: 'Movies By Year',
      type: 'pie',
      data: chartData
    }];
  }
}