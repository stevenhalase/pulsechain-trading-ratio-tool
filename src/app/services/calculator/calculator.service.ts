import { Injectable } from '@angular/core';

export interface CheatInterface {
  x2: number;
  x3: number;
  x4: number;
  x5: number;
  x10: number;
}

export interface ATSacrificeInterface {
  averageUSDPerPLS: number;
  plsPerUSD: number;
  currentPLSPerHexAtSacrifice: number;
}

export interface CalculusInterface {
  atSacrifice: ATSacrificeInterface;
  currentHexPerUSD: number;
  currentPLSPerHex: number;
  hexPerUSD: number;
  xYouArePaying: number;
  plsPerHexAtSacrifice: number;
  cheat: CheatInterface;
}

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  calculus: CalculusInterface;

  constructor() {
    this.calculus = {
      atSacrifice: {
        averageUSDPerPLS: 0,
        plsPerUSD: 0,
        currentPLSPerHexAtSacrifice: 0,
      },
      currentHexPerUSD: 0,
      currentPLSPerHex: 0,
      hexPerUSD: 0,
      xYouArePaying: 0,
      plsPerHexAtSacrifice: 0,
      cheat: {
        x2: 0,
        x3: 0,
        x4: 0,
        x5: 0,
        x10: 0,
      },
    };
  }

  calculate(currentHexPerUSD: number, currentPLSPerHex: number) {
    const averageUSDPerPLS = 0.00008;
    const plsPerUSD = this.decimalSafeMath(1, '/', averageUSDPerPLS);

    const hexPerUSD = this.decimalSafeMath(1, '/', currentHexPerUSD);
    const currentPLSPerHexAtSacrifice = this.decimalSafeMath(
      currentPLSPerHex,
      '*',
      hexPerUSD
    );
    const xYouArePaying = this.decimalSafeMath(
      plsPerUSD,
      '/',
      currentPLSPerHexAtSacrifice
    );
    const plsPerHexAtSacrifice = this.decimalSafeMath(
      plsPerUSD,
      '/',
      hexPerUSD
    );

    const x2 = this.decimalSafeMath(plsPerHexAtSacrifice, '*', 2);
    const x3 = this.decimalSafeMath(plsPerHexAtSacrifice, '*', 3);
    const x4 = this.decimalSafeMath(plsPerHexAtSacrifice, '*', 4);
    const x5 = this.decimalSafeMath(plsPerHexAtSacrifice, '*', 5);
    const x10 = this.decimalSafeMath(plsPerHexAtSacrifice, '*', 10);

    this.calculus = {
      atSacrifice: { averageUSDPerPLS, plsPerUSD, currentPLSPerHexAtSacrifice },
      currentHexPerUSD,
      currentPLSPerHex,
      hexPerUSD,
      xYouArePaying,
      plsPerHexAtSacrifice,
      cheat: { x2, x3, x4, x5, x10 },
    };
  }

  decimalSafeMath(a: number, operation: string, b: number) {
    function decimalLength(numStr) {
      var pieces = numStr?.toString().split('.');
      if (!pieces?.[1]) return 0;
      return pieces[1].length;
    }

    // Figure out what we need to multiply by to make everything a whole number
    let precision = Math.pow(10, Math.max(decimalLength(a), decimalLength(b)));

    a = a * precision;
    b = b * precision;

    // Figure out which operation to perform.
    var operator;
    switch (operation.toLowerCase()) {
      case '-':
        operator = function (a, b) {
          return a - b;
        };
        break;
      case '+':
        operator = function (a, b) {
          return a + b;
        };
        break;
      case '*':
      case 'x':
        precision = precision * precision;
        operator = function (a, b) {
          return a * b;
        };
        break;
      case '÷':
      case '/':
        precision = 1;
        operator = function (a, b) {
          return a / b;
        };
        break;

      // Let us pass in a function to perform other operations.
      default:
        operator = operation;
    }

    var result = operator(a, b);

    // Remove our multiplier to put the decimal back.
    return result / precision;
  }
}
