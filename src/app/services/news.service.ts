import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NewsResponse, NYTimesResponse, NewsArticle } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = "ViGQNI9n1FkuhYfctxsuODfzAINMCuPq";
  private baseUrl = "https://api.nytimes.com/svc/topstories/v2";

  constructor(private http: HttpClient) {}

  private transformNYTimesResponse(response: NYTimesResponse): NewsResponse {
    return {
      totalArticles: response.num_results,
      articles: response.results.map(article => ({
        title: article.title,
        description: article.abstract,
        content: article.abstract,
        url: article.url,
        image: article.multimedia?.[0]?.url || 'https://placehold.co/600x400',
        publishedAt: article.published_date,
        source: {
          name: 'The New York Times',
          url: 'https://www.nytimes.com'
        }
      }))
    };
  }

  getTopNews(): Observable<NewsResponse> {
    return this.http
      .get<NYTimesResponse>(`${this.baseUrl}/home.json?api-key=${this.apiKey}`)
      .pipe(map(response => this.transformNYTimesResponse(response)));
  }

  getNewsByCategory(category: string): Observable<NewsResponse> {
    // NY Times API uses different section names
    const sectionMap: { [key: string]: string } = {
      technology: 'technology',
      sports: 'sports',
      business: 'business',
      home: 'home'
    };

    const section = sectionMap[category] || 'home';

    return this.http
      .get<NYTimesResponse>(`${this.baseUrl}/${section}.json?api-key=${this.apiKey}`)
      .pipe(map(response => this.transformNYTimesResponse(response)));
  }
}
