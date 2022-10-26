import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConnectCaseComponent } from "./connect-case.component";

describe("ConnectCaseComponent", () => {
    let component: ConnectCaseComponent;
    let fixture: ComponentFixture<ConnectCaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConnectCaseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConnectCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
