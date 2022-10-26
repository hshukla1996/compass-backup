import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FinancialdisabilityIncomeComponent } from "./financialdisability-income.component";

describe("FinancialdisabilityIncomeComponent", () => {
    let component: FinancialdisabilityIncomeComponent;
    let fixture: ComponentFixture<FinancialdisabilityIncomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FinancialdisabilityIncomeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FinancialdisabilityIncomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
