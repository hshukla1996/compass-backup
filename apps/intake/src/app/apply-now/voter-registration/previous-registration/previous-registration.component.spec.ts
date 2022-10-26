import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PreviousRegistrationComponent } from "./previous-registration.component";

describe("PreviousRegistrationComponent", () => {
    let component: PreviousRegistrationComponent;
    let fixture: ComponentFixture<PreviousRegistrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreviousRegistrationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PreviousRegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
