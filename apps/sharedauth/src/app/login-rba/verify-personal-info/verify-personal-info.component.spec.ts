import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerifyPersonalInfoComponent } from "./verify-personal-info.component";

describe("VerifyPersonalInfoComponent", () => {
    let component: VerifyPersonalInfoComponent;
    let fixture: ComponentFixture<VerifyPersonalInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VerifyPersonalInfoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VerifyPersonalInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
