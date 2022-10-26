import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { differenceInYears } from 'date-fns';
import { Subscription } from 'rxjs';
import { IApplyNowState, IBenefitsNotReceviedData } from '../../+state/apply-now.models';
import { RoutePath } from '../../../shared/route-strategies';
import { ApplyNowStoreService } from '../../apply-now-store-service';
import { IHouseHold, IHouseHoldDetails } from '../../household/household-model';

@Component({
  selector: 'compass-ui-benefits-not-received',
  templateUrl: './benefit-and-health-situations.component.html',
  styleUrls: ['./benefit-and-health-situations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BenefitsAndHealthSituationComponent implements OnInit {

    ngOnInit(): void {
        
    }
}