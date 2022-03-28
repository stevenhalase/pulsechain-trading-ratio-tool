import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Nomics, { IRawCurrencyTicker } from 'nomics';

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
    ).pipe(
      map((response) => response?.[0]),
      catchError(this.handleError<IRawCurrencyTicker>('getCoinQuote', null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
