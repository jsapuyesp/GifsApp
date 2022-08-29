import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _baseUrl: string = 'https://api.giphy.com/v1/gifs';

  private _apiKey: string = 'RLmbCycQEUyABOdG7b2SBLkBfV2HC9Zc'

  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history]
  }

  constructor(private http: HttpClient) {
    // Esto no puede hacerse:
    // this._history = localStorage.getItem('history');

    // Una manera tradicional de hacerlo:
    // if (localStorage.getItem('history')) {
    //   this._history = JSON.parse(localStorage.getItem('history')!);
    // }

    // Equivalente al método anterior
    this._history = JSON.parse(localStorage.getItem('history')!) || [];


    this.results = JSON.parse(localStorage.getItem('lastResult')!) || [];

  }

  searchGifs(query: string) {

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);


    query = query.trim().toLocaleLowerCase()

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    // Http petitioner
    this.http.get<SearchGifsResponse>(`${this._baseUrl}/search`, { params: params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('lastResult', JSON.stringify(this.results));

      })

  }

}
