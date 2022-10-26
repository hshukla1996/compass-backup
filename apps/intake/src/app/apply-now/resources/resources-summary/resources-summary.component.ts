import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplyNowResourcesResourcesSummaryStrategy } from '../../../shared/route-strategies/apply-now/resources-summary';
import { ScreenQueueUtil } from '../../../shared/services/screen_queue_util.service';

import { ApplyNowStoreService } from '../../apply-now-store-service';

@Component({
  selector: 'compass-ui-resources-summary',
  templateUrl: './resources-summary.component.html',
  styleUrls: ['./resources-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ApplyNowResourcesResourcesSummaryStrategy]
})
export class ResourcesSummaryComponent implements OnInit {
  resourcesSummaryForm: FormGroup | any;
  constructor(private fb: FormBuilder,
    private service: ApplyNowStoreService,
    private cd: ChangeDetectorRef,
    private routingStrategy: ApplyNowResourcesResourcesSummaryStrategy,
    private router: Router,
    private screenQueueUtil: ScreenQueueUtil) { }

  ngOnInit(): void {
    this.resourcesSummaryForm=this.fb.group({
      resourcesSummary:[""]
    })
  }

  goBack() {
    this.screenQueueUtil.backPath();
  }

  goNext() {
    this.service.validateAllFormFields(this.resourcesSummaryForm);
    if (this.resourcesSummaryForm.valid) {
      this.screenQueueUtil.nextPath();
      return true;
    }
    else {
      return false;
    }

}
}
