import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthhomeComponent } from "./authhome.component";

describe("AuthhomeComponent", () => {
    let component: AuthhomeComponent;
    let fixture: ComponentFixture<AuthhomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthhomeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthhomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
