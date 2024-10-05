import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart1',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './chart1.component.html',
  styleUrl: './chart1.component.scss'
})

export class Chart1Component implements OnInit {
  @Input() Movies !: Movie[];
  MoviesByYear = new Map<number, number>();
  AvgImdbByYear = new Map<number, number>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Year wise Avg imdbRating'
    },
    xAxis: {
      type: 'category',
  },
    series: [{
      name: 'Movies By Year',
      type: 'column',
      data: []
    }]
  };

  ngOnInit(): void {
    this.Movies.forEach((movie) => {
      const year = movie.year;
      const currentCount = this.MoviesByYear.get(year) || 0;
      this.MoviesByYear.set(year, currentCount + 1);
    });

    this.Movies.map((movie) => {
      const year = movie.year;
      const currentCount = this.AvgImdbByYear.get(year) || 0;
      this.AvgImdbByYear.set(year, movie.imdbRating + currentCount);
    });

    const chartData = Array.from(this.MoviesByYear.entries()).map(([year, count]) => {
      const avgImdb = this.AvgImdbByYear.get(year) || 1;
      return {
        name: String(year),
        y: avgImdb/count,
      };
    });

    this.chartOptions.series = [{
      name: 'Imdb Rating By Year',
      type: 'column',
      data: chartData
    }];
  }
}
