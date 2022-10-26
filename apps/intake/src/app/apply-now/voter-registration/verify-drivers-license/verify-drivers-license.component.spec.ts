import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerifyDriversLicenseComponent } from "./verify-drivers-license.component";

describe("VerifyDriversLicenseComponent", () => {
    let component: VerifyDriversLicenseComponent;
    let fixture: ComponentFixture<VerifyDriversLicenseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VerifyDriversLicenseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VerifyDriversLicenseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
