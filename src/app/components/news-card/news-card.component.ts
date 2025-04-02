import { Component, Input } from '@angular/core';
import { NewsArticle } from '../../models/news.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-news-card',
    imports: [DatePipe],
    templateUrl: './news-card.component.html',
    styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
  @Input() article!: NewsArticle;
}
