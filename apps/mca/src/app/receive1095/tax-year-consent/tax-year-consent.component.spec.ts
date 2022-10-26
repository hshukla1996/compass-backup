import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TaxYearConsentComponent } from "./tax-year-consent.component";

describe("TaxYearConsentComponent", () => {
    let component: TaxYearConsentComponent;
    let fixture: ComponentFixture<TaxYearConsentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TaxYearConsentComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaxYearConsentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
