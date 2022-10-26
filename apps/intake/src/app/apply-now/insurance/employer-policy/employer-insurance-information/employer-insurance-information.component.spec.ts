import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EmployerInsuranceInformationComponent } from "./employer-insurance-information.component";

describe("EmployerInsuranceInformationComponent", () => {
    let component: EmployerInsuranceInformationComponent;
    let fixture: ComponentFixture<EmployerInsuranceInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EmployerInsuranceInformationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            EmployerInsuranceInformationComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
