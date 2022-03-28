import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export enum ThemesEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  ThemesEnum = ThemesEnum;

  private _theme = new BehaviorSubject<ThemesEnum>(ThemesEnum.DARK);
  theme$ = this._theme.asObservable();

  constructor() {
    this._theme.subscribe((theme) => {
      document.body.classList.toggle('dark', theme === ThemesEnum.DARK);
    });
  }

  toggle(value: boolean) {
    this._theme.next(value ? ThemesEnum.DARK : ThemesEnum.LIGHT);
  }
}
