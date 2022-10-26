import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItemState } from '../../../shared/menu-item-state';
import { RoutePath } from '../../../shared/route-strategies';

@Component({
  selector: 'compass-ui-community-organization',
  templateUrl: './community-organization.component.html',
  styleUrls: ['./community-organization.component.scss']
})
export class CommunityOrganizationComponent implements OnInit {
 
  communityOrganizationForm: FormGroup | any;

  constructor(private fb: FormBuilder,
    private route: Router) { }
  isFieldValid(field: string): boolean {

    // return (this.contactInformationForm.get(field).status !== 'VALID' && (this.contactInformationForm.get(field).dirty || this.contactInformationForm.get(field).touched))

    return (
      this.communityOrganizationForm.get(field)?.status !== "VALID" &&
      this.communityOrganizationForm.get(field)?.touched
    );
  }
  previous(){
    this.route.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_GATEPOST
    ]);
  }

  next(){
    this.communityOrganizationForm.markAllAsTouched(); 
    if (this.communityOrganizationForm.valid) {
    this.route.navigate([
      RoutePath.APPLYNOW + "/" + RoutePath.APPLYNOW_GETTINGSTARTED_NONPROVIDERREGISTRATION
    ]);
  }
  }
  //@Output() formState = new EventEmitter<MenuItemState>();

  ngOnInit() {
  //  this.formState.emit(MenuItemState.INPROGRESS);
    this.communityOrganizationForm = this.fb.group({
      organizationName: ['', Validators.required],
      typeOfCommunity: ['', Validators.required]
    }
    )
  }
  ngOnDestroy(): void {
    //  this.formState.emit(MenuItemState.COMPLETED);
  }

}
