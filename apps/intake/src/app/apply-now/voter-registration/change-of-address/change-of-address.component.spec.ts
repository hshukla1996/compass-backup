import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeOfAddressComponent } from "./change-of-address.component";

describe("ChangeOfAddressComponent", () => {
    let component: ChangeOfAddressComponent;
    let fixture: ComponentFixture<ChangeOfAddressComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangeOfAddressComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeOfAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
