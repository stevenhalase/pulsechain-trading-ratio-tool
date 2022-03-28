import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CalculatorService,
  CoinPriceService,
  ThemesEnum,
  ThemeService,
} from '../services';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRawCurrencyTicker } from 'nomics';
import { map, shareReplay } from 'rxjs/operators';

export enum CoinsEnum {
  PLS = 'pls',
  PLSX = 'plsx',
}

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorPage implements OnInit {
  ThemesEnum = ThemesEnum;
  coins = ['pls', 'plsx'];
  theme$: Observable<ThemesEnum>;

  darkWordmark = '/assets/WordmarkVectorWhite.svg';
  lightWordmark = '/assets/WordmarkVectorBlack.svg';

  calculusForm: FormGroup;

  private _coin = new BehaviorSubject<CoinsEnum>(CoinsEnum.PLS);
  coin$ = this._coin.asObservable();

  private _useAPI = new BehaviorSubject<boolean>(true);
  useAPI$ = this._useAPI.asObservable();

  hexQuote$: Observable<IRawCurrencyTicker>;
  hexQuoteDate$: Observable<Date>;
  hexQuoteRefreshDate$: Observable<Date>;

  constructor(
    private _calculatorService: CalculatorService,
    private _themeService: ThemeService,
    private _coinPriceService: CoinPriceService
  ) {}

  ngOnInit(): void {
    this.theme$ = this._themeService.theme$;

    const controls = Object.keys(this._calculatorService.calculus).reduce(
      (formControls, prop) => {
        let validators = [];
        if (prop === 'currentHexPerUSD' || prop === 'currentPLSPerHex') {
          validators = [
            Validators.required,
            Validators.nullValidator,
            Validators.minLength(1),
          ];
        }

        if (typeof this._calculatorService.calculus[prop] === 'object') {
          const objControls = Object.keys(
            this._calculatorService.calculus[prop]
          ).reduce((objFormControls, objProp) => {
            objFormControls[objProp] = new FormControl(0);
            return objFormControls;
          }, {});
          formControls[prop] = new FormGroup(objControls);
        } else {
          formControls[prop] = new FormControl(0);
        }
        return formControls;
      },
      {}
    );

    this.calculusForm = new FormGroup(controls);

    this.calculusForm.valueChanges.subscribe((formValue) => {
      if (formValue.currentHexPerUSD && formValue.currentPLSPerHex) {
        this.calculate(formValue.currentHexPerUSD, formValue.currentPLSPerHex);
      }
    });

    this.calculusForm.controls.currentHexPerUSD.setValue(0.138);
    this.calculusForm.controls.currentPLSPerHex.setValue(646);

    this.useAPI$.subscribe((useAPI) => {
      this.hexQuote$ = this._coinPriceService
        .getCoinQuote('HEX')
        .pipe(shareReplay(1));

      this.hexQuoteDate$ = this.hexQuote$.pipe(
        map((hexQuote) => new Date(hexQuote?.price_timestamp))
      );

      this.hexQuoteRefreshDate$ = this.hexQuote$.pipe(map(() => new Date()));

      let hexQuoteSub = null;
      if (useAPI) {
        hexQuoteSub = this.hexQuote$.subscribe((hexQuote) => {
          this.calculusForm.controls.currentHexPerUSD.setValue(hexQuote.price);
        });
      } else {
        if (hexQuoteSub) {
          hexQuoteSub.unsubscribe();
        }
      }
    });
  }

  calculate(currentHexPerUSD: number = 0, currentPLSPerHex: number = 0) {
    this._calculatorService.calculate(currentHexPerUSD, currentPLSPerHex);
    Object.keys(this._calculatorService.calculus).forEach((prop) => {
      if (typeof this._calculatorService.calculus[prop] === 'object') {
        Object.keys(this._calculatorService.calculus[prop]).forEach(
          (objProp) => {
            (this.calculusForm.controls[prop] as any).controls[
              objProp
            ].setValue(this._calculatorService.calculus[prop][objProp], {
              emitEvent: false,
            });
          }
        );
      } else if (prop !== 'currentHexPerUSD' && prop !== 'currentPLSPerHex') {
        this.calculusForm.controls[prop].setValue(
          this._calculatorService.calculus[prop],
          { emitEvent: false }
        );
      }
    });
  }

  coinChanged(event) {
    this._coin.next(event.detail.value);
  }

  toggleUseAPI(event) {
    this._useAPI.next(event.detail.checked);
  }

  refreshHexPrice() {
    this._useAPI.next(false);
    this._useAPI.next(true);
  }
}
