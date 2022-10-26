import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UploadSummaryComponent } from "./upload-summary.component";

describe("UploadSummaryComponent", () => {
    let component: UploadSummaryComponent;
    let fixture: ComponentFixture<UploadSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadSummaryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
