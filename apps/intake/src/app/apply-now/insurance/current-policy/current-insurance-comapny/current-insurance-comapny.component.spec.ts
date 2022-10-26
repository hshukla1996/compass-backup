import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrentInsuranceComapnyComponent } from "./current-insurance-comapny.component";

describe("CurrentInsuranceComapnyComponent", () => {
    let component: CurrentInsuranceComapnyComponent;
    let fixture: ComponentFixture<CurrentInsuranceComapnyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrentInsuranceComapnyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentInsuranceComapnyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
