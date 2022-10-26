import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WhoFilledFormComponent } from "./who-filled-form.component";

describe("WhoFilledFormComponent", () => {
    let component: WhoFilledFormComponent;
    let fixture: ComponentFixture<WhoFilledFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WhoFilledFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WhoFilledFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
