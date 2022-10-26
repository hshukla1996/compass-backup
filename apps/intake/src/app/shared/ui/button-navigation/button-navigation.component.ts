import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { State } from '../../../+state/app.state';
import { getApplyNow } from '../../../apply-now/+state/apply-now.selectors';
import { getDoIQualify } from '../../../do-i-qualify/+state/do-i-qualify.selectors';
import { getReferrals } from '../../../referrals/+state/referrals.selectors';
import { Direction, RoutePath } from '../../route-strategies';
import {
  IConditionalRoutable,
  StrategyTypes,
} from '../../route-strategies/strategy';
import { StrategyFactory } from '../../route-strategies/strategy.factory';
import { DoIQualifyService } from '../../services/do-i-qualify.service';

@Component({
  selector: 'compass-ui-button-navigation',
  templateUrl: './button-navigation.component.html',
  styleUrls: ['./button-navigation.component.scss'],
})
export class ButtonNavigationComponent implements OnInit, OnDestroy {
  direction: typeof Direction = Direction;
  strategy!: StrategyTypes;
  module!: string;
  @Output() nextClick = new EventEmitter<string>();
  subscription = new Subscription();
  urlWithParams = false;

  constructor(
    private factory: StrategyFactory,
    private router: Router,
    private store: Store<State>,
    private doIQualifyService: DoIQualifyService
  ) {

  }

  ngOnInit(): void {
    this.setStrategy(this.router.url);
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((e: any) => this.setStrategy(this.router.url))
    );
  }

  get hideBackButton(): boolean {
    if (this.router.url.indexOf('userId') > -1)
      return true;

    return this.strategy && this.strategy.hideBackButton
      ? this.strategy.hideBackButton
      : false;
  }

  get hideNextButton(): boolean {
    if (this.router.url.indexOf('userId') > -1)
      return true;
    return this.strategy && this.strategy.hideNextButton
      ? this.strategy.hideNextButton
      : false;
  }

  get backButtonText(): string {
    return this.strategy && this.strategy.backButtonText
      ? this.strategy.backButtonText
      : 'Back';
  }

  get nextButtonText(): string {
    return this.strategy && this.strategy.nextButtonText
      ? this.strategy.nextButtonText
      : 'Next';
  }

  setStrategy(url: string): void {
    this.strategy = this.factory.getStrategy(url.substring(1));

    if (this.isConditionalRoutable(this.strategy)) {
      const sub = this.getFeatureStore(url).subscribe((data) => {
        if (this.strategy)
          (this.strategy as IConditionalRoutable).setDataContext(data);
      });
      sub.unsubscribe();
    }
  }

  getFeatureStore(url: string): Observable<any> {
    const module = url.split('/')[1];

    if (module.toUpperCase() === RoutePath.APPLYNOW.toUpperCase())
      return this.store.select(getApplyNow);
    if (module.toUpperCase() === RoutePath.DOIQUALIFY.toUpperCase())
      return this.store.select(getDoIQualify);
    return this.store.select(getReferrals);
  }

  goTo(direction: Direction) {
    this.doIQualifyService.triggerNext$.next(true);
    this.triggerNext(this.router.url)
    this.setStrategy(this.router.url)
    const route =
      direction === 'NEXT'
        ? this.strategy.nextRoute()
        : this.strategy.previousRoute();
    this.router.navigate([route]);
  }
  triggerNext(value: string) {
    this.nextClick.emit(value);
  }
  private isConditionalRoutable(strategy: StrategyTypes): boolean {
    // TODO: Can be simplified
    if(strategy)
    return 'setDataContext' in strategy;
    else
    return false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
