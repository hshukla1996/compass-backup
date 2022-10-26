import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VoterAddressReviewComponent } from "./voter-address-review.component";

describe("VoterAddressReviewComponent", () => {
    let component: VoterAddressReviewComponent;
    let fixture: ComponentFixture<VoterAddressReviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VoterAddressReviewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VoterAddressReviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
