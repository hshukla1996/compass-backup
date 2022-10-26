import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChangeOfNameComponent } from "./change-of-name.component";

describe("ChangeOfNameComponent", () => {
    let component: ChangeOfNameComponent;
    let fixture: ComponentFixture<ChangeOfNameComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangeOfNameComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeOfNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
