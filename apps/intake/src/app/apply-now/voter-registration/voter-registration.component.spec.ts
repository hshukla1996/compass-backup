import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VoterRegistrationGettingStartedComponent } from "./voter-registration.component";

describe("VoterRegistrationComponent", () => {
    let component: VoterRegistrationGettingStartedComponent;
    let fixture: ComponentFixture<VoterRegistrationGettingStartedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VoterRegistrationGettingStartedComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterRegistrationGettingStartedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
