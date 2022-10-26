import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UploadSignatureSummaryComponent } from "./upload-signature-summary.component";

describe("UploadSignatureSummaryComponent", () => {
    let component: UploadSignatureSummaryComponent;
    let fixture: ComponentFixture<UploadSignatureSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadSignatureSummaryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadSignatureSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
