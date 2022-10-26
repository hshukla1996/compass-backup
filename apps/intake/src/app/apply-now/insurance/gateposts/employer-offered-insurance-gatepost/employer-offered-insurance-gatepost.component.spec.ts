import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerOfferedInsuranceGatepostComponent } from "./employer-offered-insurance-gatepost.component";

describe("EmployerOfferedInsuranceGatepostComponent", () => {
    let component: EmployerOfferedInsuranceGatepostComponent;
    let fixture: ComponentFixture<EmployerOfferedInsuranceGatepostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerOfferedInsuranceGatepostComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            EmployerOfferedInsuranceGatepostComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
