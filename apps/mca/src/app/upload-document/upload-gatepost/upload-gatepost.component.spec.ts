import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UploadGatepostComponent } from "./upload-gatepost.component";

describe("UploadGatepostComponent", () => {
    let component: UploadGatepostComponent;
    let fixture: ComponentFixture<UploadGatepostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadGatepostComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadGatepostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
