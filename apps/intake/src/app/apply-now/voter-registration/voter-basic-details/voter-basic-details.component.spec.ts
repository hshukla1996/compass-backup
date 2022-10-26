import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VoterBasicDetailsComponent } from "./voter-basic-details.component";

describe("VoterBasicDetailsComponent", () => {
    let component: VoterBasicDetailsComponent;
    let fixture: ComponentFixture<VoterBasicDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VoterBasicDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterBasicDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
