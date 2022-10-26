import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RsdvdDividerComponent } from "./rsdvd-divider.component";

describe("RsdvdDividerComponent", () => {
    let component: RsdvdDividerComponent;
    let fixture: ComponentFixture<RsdvdDividerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RsdvdDividerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RsdvdDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
