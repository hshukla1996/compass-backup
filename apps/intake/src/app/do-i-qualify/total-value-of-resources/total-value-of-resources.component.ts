import { Component, Input, OnInit } from '@angular/core';
import { TotalValueOfResources } from '../+state/do-i-qualify.models';

@Component({
  selector: 'compass-ui-total-value-of-resources',
  templateUrl: './total-value-of-resources.component.html',
  styleUrls: ['./total-value-of-resources.component.scss']
})
export class TotalValueOfResourcesComponent implements OnInit {
  @Input() data!: TotalValueOfResources | null;


  constructor() { }

  ngOnInit(): void {
  }

}
