import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GoPaperlessComponent } from "./go-paperless.component";

describe("GoPaperlessComponent", () => {
    let component: GoPaperlessComponent;
    let fixture: ComponentFixture<GoPaperlessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GoPaperlessComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GoPaperlessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
