import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckAppStatusComponent } from "./check-app-status.component";

describe("CheckAppStatusComponent", () => {
    let component: CheckAppStatusComponent;
    let fixture: ComponentFixture<CheckAppStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckAppStatusComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckAppStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
