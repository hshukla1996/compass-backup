import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SituationGatepostComponent } from "./situation-gatepost.component";

describe("SituationGatepostComponent", () => {
    let component: SituationGatepostComponent;
    let fixture: ComponentFixture<SituationGatepostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SituationGatepostComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SituationGatepostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
