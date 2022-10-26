import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PriorInsuranceComapnyComponent } from "./prior-insurance-comapny.component";

describe("PriorInsuranceComapnyComponent", () => {
    let component: PriorInsuranceComapnyComponent;
    let fixture: ComponentFixture<PriorInsuranceComapnyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PriorInsuranceComapnyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriorInsuranceComapnyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
