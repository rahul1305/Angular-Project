import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { NewsArticle } from '../../models/news.model';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-news-list',
    imports: [CommonModule, NewsCardComponent, LoadingSpinnerComponent],
    providers: [NewsService],
    templateUrl: './news-list.component.html',
    styleUrl: './news-list.component.css'
})

export class NewsListComponent implements OnInit {
  articles: NewsArticle[] = [];
  loading = true;
  category: string | null = null;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.loading = true;
        this.category = params['category'];
        return this.category ?
          this.newsService.getNewsByCategory(this.category) :
          this.newsService.getTopNews();
      })
    ).subscribe({
      next: (response) => {
        this.articles = response.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        this.loading = false;
      }
    });
  }
}
