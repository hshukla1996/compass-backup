import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UploadConfirmationComponent } from "./upload-confirmation.component";

describe("UploadConfirmationComponent", () => {
    let component: UploadConfirmationComponent;
    let fixture: ComponentFixture<UploadConfirmationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadConfirmationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
