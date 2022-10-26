import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VoterRaceComponent } from "./voter-race.component";

describe("VoterRaceComponent", () => {
    let component: VoterRaceComponent;
    let fixture: ComponentFixture<VoterRaceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VoterRaceComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterRaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
