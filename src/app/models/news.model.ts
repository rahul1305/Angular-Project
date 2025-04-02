export interface NYTimesArticle {
  title: string;
  abstract: string;
  url: string;
  published_date: string;
  multimedia: Array<{
    url: string;
    type: string;
  }>;
  section: string;
}

export interface NYTimesResponse {
  status: string;
  num_results: number;
  results: NYTimesArticle[];
}

// Convert NY Times format to our app's format
export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}
