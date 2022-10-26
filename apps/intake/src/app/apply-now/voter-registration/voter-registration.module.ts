import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VoterRegistrationRoutingModule } from "../individual-details/voter-registration/voter-registration-routing.module";
import { VoterAddressReviewComponent } from "./voter-address-review/voter-address-review.component";

@NgModule({
    imports: [CommonModule, VoterRegistrationRoutingModule],
    declarations: [VoterAddressReviewComponent],
})
export class VoterRegistrationModule {}
