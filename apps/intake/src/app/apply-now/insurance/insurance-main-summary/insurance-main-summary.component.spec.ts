import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InsuranceMainSummaryComponent } from "./insurance-main-summary.component";

describe("InsuranceMainSummaryComponent", () => {
    let component: InsuranceMainSummaryComponent;
    let fixture: ComponentFixture<InsuranceMainSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsuranceMainSummaryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsuranceMainSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
