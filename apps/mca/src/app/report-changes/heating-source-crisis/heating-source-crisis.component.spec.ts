import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeatingSourceCrisisComponent } from "./heating-source-crisis.component";

describe("HeatingSourceCrisisComponent", () => {
    let component: HeatingSourceCrisisComponent;
    let fixture: ComponentFixture<HeatingSourceCrisisComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeatingSourceCrisisComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeatingSourceCrisisComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
