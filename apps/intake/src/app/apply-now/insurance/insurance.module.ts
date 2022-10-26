import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//import { InsuranceComponent } from '../insurance/insurance.component';
import { InsuranceRoutingModule } from "./insurance-routing.module";
import { PriorPolicyHolderComponent } from "./prior-policy/prior-policy-holder/prior-policy-holder.component";
import { EmployerPolicyHolderComponent } from "./employer-policy/employer-policy-holder/employer-policy-holder.component";
import { EmployerCoverageSelectionComponent } from "./employer-policy/employer-coverage-selection/employer-coverage-selection.component";
import { EmployerPolicyProviderComponent } from "./employer-policy/employer-policy-provider/employer-policy-provider.component";
import { EmployerPolicyAdditionalDetailComponent } from "./employer-policy/employer-policy-additional-detail/employer-policy-additional-detail.component";
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        // InsuranceComponent

        /* InsuranceDividerComponent,
        InsuranceGatepostComponent,
        WhoHealthOrMedicalComponent,
        WhoIsCoveredComponent,
        PolicyInformationComponent,
        PolicyInformationOtherHmoComponent,
        PolicyInformationDifferentAddressComponent,
        InsuranceEndingComponent, */

       
    ],
    imports: [
        CommonModule, //InsuranceRoutingModule
    ],
})
export class InsuranceModule {}
