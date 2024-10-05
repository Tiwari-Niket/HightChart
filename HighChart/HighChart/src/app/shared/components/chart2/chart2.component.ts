import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { FormsModule } from '@angular/forms';

type ChartType = 'column' | 'bar' | 'line' | 'pie' | 'area' | 'scatter';

@Component({
  selector: 'app-chart2',
  standalone: true,
  imports: [HighchartsChartModule, FormsModule],
  templateUrl: './chart2.component.html',
  styleUrl: './chart2.component.scss'
})

export class Chart2Component {
  @Input() Movies !: Movie[];
  chartType: ChartType = 'column';
  Genre = new Set<string>();
  genreCount = new Map<string, number>();
  Runtime = new Map<string, number>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: this.chartType,
    },
    title: {
      text: 'Genre wise Avg Runtime'
    },
    xAxis: {
      type: 'category',
  },
    series: [{
      name: 'Genre wise Avg Runtime',
      type: this.chartType,
      data: []
    }]
  };

  ngOnInit(): void {
    this.getChart();
  }

  getChart() {
    this.Movies.forEach((movie) => {
      const data = movie.genre.split(', ');
      data.map(d => {
        this.Genre.add(d);
        const genre = this.genreCount.get(d) || 0;
        this.genreCount.set(d, genre + 1);
      })
    });

    this.Movies.map((movie) => {
      const data = movie.genre.split(', ');
      this.Genre.forEach((genre) => {
        if (data.includes(genre)) {
          const runtime = this.Runtime.get(genre) || 0;
          this.Runtime.set(genre, runtime + movie.runtime);
        }
      });
    });

    const chartData = Array.from(this.Runtime.entries()).map(([genre, runtime]) => {
      const count = this.genreCount.get(genre) || 1;
      return {
        name: genre,
        y: runtime / count,
      };
    });

    this.chartOptions.series = [{
      name: 'Genre wise Avg Runtime',
      type: this.chartType,
      data: chartData
    }];
  }
  updateChart() {
    console.log(this.chartType);

    this.chartOptions = {
        chart: {
            type: this.chartType,
        },
        title: {
            text: 'Genre wise Avg Runtime',
        },
        series: [{
            name: 'Genre wise Avg Runtime',
            type: this.chartType,  
            data: Array.from(this.Runtime.entries()).map(([genre, runtime]) => {
                const count = this.genreCount.get(genre) || 1;
                return {
                    name: genre,
                    y: runtime / count,
                };
            })
        }]
    };
}

}
