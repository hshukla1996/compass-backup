import { Injectable } from '@angular/core';
import { Strageries } from '.';
import { HomeStrategy } from './home-strategy';
import { StrategyTypes } from './strategy';

@Injectable({ providedIn: 'root' })
export class StrategyFactory {
  getStrategy(route: string): StrategyTypes {
    const strategies = Strageries.map((s) => new s()).filter(
      (s) => s.currentRoute.toUpperCase() === route.toUpperCase()
    );

    return strategies ? strategies[0] : new HomeStrategy();
  }
}
