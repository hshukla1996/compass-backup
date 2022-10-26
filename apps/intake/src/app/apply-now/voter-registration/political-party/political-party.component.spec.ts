import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PoliticalPartyComponent } from "./political-party.component";

describe("PoliticalPartyComponent", () => {
    let component: PoliticalPartyComponent;
    let fixture: ComponentFixture<PoliticalPartyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PoliticalPartyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PoliticalPartyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
