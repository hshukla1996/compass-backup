import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OtherIncomeAddressComponent } from "./other-income-address.component";

describe("OtherIncomeAddressComponent", () => {
    let component: OtherIncomeAddressComponent;
    let fixture: ComponentFixture<OtherIncomeAddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OtherIncomeAddressComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OtherIncomeAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
