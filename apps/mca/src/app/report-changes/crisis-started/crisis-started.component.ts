import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../../shared/route-strategies';

@Component({
  selector: 'compass-ui-crisis-started',
  templateUrl: './crisis-started.component.html',
  styleUrls: ['./crisis-started.component.css']
})
export class CrisisStartedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onNext() {
    this.router.navigate([RoutePath.EMERGENCY_SITUATIONS]);
  }

  onBack() {
    this.router.navigate([RoutePath.REPORT_CHANGES_GATEPOST]);
  }

}
