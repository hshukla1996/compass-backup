import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectIdentityVerifyMethodComponent } from "./select-identity-verify-method.component";

describe("SelectIdentityVerifyMethodComponent", () => {
    let component: SelectIdentityVerifyMethodComponent;
    let fixture: ComponentFixture<SelectIdentityVerifyMethodComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectIdentityVerifyMethodComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectIdentityVerifyMethodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
