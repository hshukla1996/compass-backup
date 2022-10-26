import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrentPoilcyEndComponent } from "./current-poilcy-end.component";

describe("CurrentPoilcyEndComponent", () => {
    let component: CurrentPoilcyEndComponent;
    let fixture: ComponentFixture<CurrentPoilcyEndComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CurrentPoilcyEndComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentPoilcyEndComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
