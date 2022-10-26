import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PriorPoilcyEndComponent } from "./prior-poilcy-end.component";

describe("PriorPoilcyEndComponent", () => {
    let component: PriorPoilcyEndComponent;
    let fixture: ComponentFixture<PriorPoilcyEndComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PriorPoilcyEndComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriorPoilcyEndComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
