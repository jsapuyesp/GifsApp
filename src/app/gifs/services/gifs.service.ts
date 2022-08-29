import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'RLmbCycQEUyABOdG7b2SBLkBfV2HC9Zc'

  private _history: string[] = [];

  // TODO: Change this type
  public results: any[] = [];

  get history() {
    return [...this._history]
  }

  constructor(private http: HttpClient) { }

  searchGifs(query: string) {

    query = query.trim().toLocaleLowerCase()

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
    }

    // Http petitioner
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe((response: any) => {
        console.log(response.data);
        this.results = response.data;
      })

  }

}
