import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VoterRegistrationEndingComponent } from "./voter-registration-ending.component";

describe("VoterRegistrationEndingComponent", () => {
    let component: VoterRegistrationEndingComponent;
    let fixture: ComponentFixture<VoterRegistrationEndingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VoterRegistrationEndingComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterRegistrationEndingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
