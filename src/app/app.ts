import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioPage } from './portfolio-page/portfolio-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PortfolioPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('new-portfolio');
}
