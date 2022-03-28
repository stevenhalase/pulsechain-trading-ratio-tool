import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemesEnum, ThemeService } from 'src/app/services';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: 'theme-toggle.component.html',
  styleUrls: ['theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent implements OnInit {
  ThemesEnum = ThemesEnum;
  theme$: Observable<ThemesEnum>;

  constructor(private _themeService: ThemeService) {}

  ngOnInit(): void {
    this.theme$ = this._themeService.theme$;
  }

  toggle(event) {
    this._themeService.toggle(event.detail.checked);
  }
}
