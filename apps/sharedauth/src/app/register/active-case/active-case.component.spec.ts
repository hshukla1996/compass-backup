import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ActiveCaseComponent } from "./active-case.component";

describe("ActiveCaseComponent", () => {
    let component: ActiveCaseComponent;
    let fixture: ComponentFixture<ActiveCaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ActiveCaseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
