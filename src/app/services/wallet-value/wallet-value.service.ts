import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface GetWalletBalanceResponseInterface {
  status: string;
  message: string;
  result: string;
}

export interface TransactionInterface {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export interface GetWalletTransactionsResponseInterface {
  status: string;
  message: string;
  result: TransactionInterface[];
}

export interface TokenTransferInterface {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

export interface GetWalletTokenTransfersResponseInterface {
  status: string;
  message: string;
  result: TokenTransferInterface[];
}

@Injectable({
  providedIn: 'root',
})
export class WalletValueService {
  private _etherscanBaseUrl = 'https://api.etherscan.io/';
  private _apiKey = environment.ETHERSCAN_API_KEY;

  constructor(private _httpClient: HttpClient) {}

  getWalletValue() {
    return this._httpClient
      .get<GetWalletBalanceResponseInterface>(
        `${this._etherscanBaseUrl}api?module=account&action=balance&address=0xAa7C3177d34a8Da20D77811A07d4a9ca7289D763&tag=latest&apikey=${this._apiKey}`
      )
      .pipe(
        map((response) => response.result),
        catchError(this.handleError<string>('getWalletBalance', null))
      );
  }

  getWalletTransactions() {
    return this._httpClient
      .get<GetWalletTransactionsResponseInterface>(
        `${this._etherscanBaseUrl}api?module=account&action=txlist&address=0xAa7C3177d34a8Da20D77811A07d4a9ca7289D763&page=1&sort=asc&apikey=${this._apiKey}`
      )
      .pipe(
        map((response) => response.result),
        catchError(
          this.handleError<TransactionInterface[]>(
            'getWalletTransactions',
            null
          )
        )
      );
  }

  getWalletTokenTransfers() {
    return this._httpClient
      .get<GetWalletTokenTransfersResponseInterface>(
        `${this._etherscanBaseUrl}api?module=account&action=tokentx&address=0xAa7C3177d34a8Da20D77811A07d4a9ca7289D763&page=1&sort=asc&apikey=${this._apiKey}`
      )
      .pipe(
        map((response) => response.result),
        catchError(
          this.handleError<TokenTransferInterface[]>(
            'getWalletTokenTransfers',
            null
          )
        )
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
