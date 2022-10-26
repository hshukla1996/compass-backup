import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InsuranceAddressComponent } from "./insurance-address.component";

describe("InsuranceAddressComponent", () => {
    let component: InsuranceAddressComponent;
    let fixture: ComponentFixture<InsuranceAddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsuranceAddressComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsuranceAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
