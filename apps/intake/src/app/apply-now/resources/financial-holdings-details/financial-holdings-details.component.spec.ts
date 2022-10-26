import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FinancialHoldingsDetailsComponent } from "./financial-holdings-details.component";

describe("FinancialHoldingsDetailsComponent", () => {
    let component: FinancialHoldingsDetailsComponent;
    let fixture: ComponentFixture<FinancialHoldingsDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FinancialHoldingsDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FinancialHoldingsDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
