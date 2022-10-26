import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthcodeComponent } from "./authcode.component";

describe("AuthcodeComponent", () => {
    let component: AuthcodeComponent;
    let fixture: ComponentFixture<AuthcodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthcodeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthcodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
