import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CalculatorService,
  ThemesEnum,
  ThemeService,
  TokenTransferInterface,
  TransactionInterface,
  WalletValueService,
} from '../services';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export enum CoinsEnum {
  PLS = 'pls',
  PLSX = 'plsx',
}

@Component({
  selector: 'app-support',
  templateUrl: 'support.page.html',
  styleUrls: ['support.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportPage implements OnInit {
  Math = Math;
  Number = Number;
  ThemesEnum = ThemesEnum;
  theme$: Observable<ThemesEnum>;

  darkWordmark = '/assets/WordmarkVectorWhite.svg';
  lightWordmark = '/assets/WordmarkVectorBlack.svg';

  walletValue$: Observable<string>;
  walletTokenTransfers$: Observable<TokenTransferInterface[]>;

  constructor(
    private _themeService: ThemeService,
    private _walletValueService: WalletValueService
  ) {}

  ngOnInit(): void {
    this.theme$ = this._themeService.theme$;

    this.walletValue$ = this._walletValueService.getWalletValue();
    this.walletTokenTransfers$ =
      this._walletValueService.getWalletTokenTransfers();
  }
}
