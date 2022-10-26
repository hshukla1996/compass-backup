import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NonResidentialPropertyAdditionaldetailsComponent } from "./non-residential-property-additionaldetails.component";

describe("NonResidentialPropertyAdditionaldetailsComponent", () => {
    let component: NonResidentialPropertyAdditionaldetailsComponent;
    let fixture: ComponentFixture<NonResidentialPropertyAdditionaldetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NonResidentialPropertyAdditionaldetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            NonResidentialPropertyAdditionaldetailsComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
