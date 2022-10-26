import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'compass-ui-resources-ending',
  templateUrl: './resources-ending.component.html',
  styleUrls: ['./resources-ending.component.scss']
})
export class ResourcesEndingComponent implements OnInit {
  router: any;
  routingStrategy: any;

  constructor() { }

  ngOnInit(): void {
  }
  goBack(){
    this.router.navigate([this.routingStrategy.previousRoute()]);
  }

}
