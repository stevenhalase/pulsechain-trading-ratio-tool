import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Nomics from 'nomics';

@Injectable({
  providedIn: 'root',
})
export class CoinPriceService {
  private _apiKey = '1ffec1319bb59391351d47c7bcf780fcab2ffc0f';

  private _nomics = new Nomics({
    apiKey: this._apiKey,
  });

  constructor() {}

  getCoinQuote(symbol: string) {
    return from(
      this._nomics.currenciesTicker({
        interval: ['1d'],
        ids: [symbol],
      })
    ).pipe(map((response) => response?.[0]));
  }
}
