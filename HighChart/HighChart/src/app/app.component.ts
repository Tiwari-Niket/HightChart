import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api.service';
import { Movie } from './shared/models/movie';
import { PieChartComponent } from "./shared/components/pie-chart/pie-chart.component";
import { Chart1Component } from "./shared/components/chart1/chart1.component";
import { Chart2Component } from "./shared/components/chart2/chart2.component";
import { Chart3Component } from "./shared/components/chart3/chart3.component";
import { Chart4Component } from "./shared/components/chart4/chart4.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PieChartComponent, Chart1Component, Chart2Component, Chart3Component, Chart4Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'HighChart';
  movies!: Movie[];
  isLoading: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMovies().subscribe(success => {
      this.movies = success;
      this.isLoading = true;
    });
  }
}
