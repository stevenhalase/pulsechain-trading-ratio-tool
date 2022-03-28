import { CalculatorService } from './calculator/calculator.service';
import { CoinPriceService } from './coin-price/coin-price.service';
import { ThemeService } from './theme/theme.service';
import { WalletValueService } from './wallet-value/wallet-value.service';

export const services = [
  CalculatorService,
  CoinPriceService,
  ThemeService,
  WalletValueService,
];

export * from './calculator/calculator.service';
export * from './coin-price/coin-price.service';
export * from './theme/theme.service';
export * from './wallet-value/wallet-value.service';
