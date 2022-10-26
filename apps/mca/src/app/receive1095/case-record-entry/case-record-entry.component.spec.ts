import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CaseRecordEntryComponent } from "./case-record-entry.component";

describe("CaseRecordEntryComponent", () => {
    let component: CaseRecordEntryComponent;
    let fixture: ComponentFixture<CaseRecordEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CaseRecordEntryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CaseRecordEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
