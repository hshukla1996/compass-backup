import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { LinkCaseSelectionComponent } from './link-case-selection.component';

describe('LinkCaseSelectionComponent', () => {
    let component: LinkCaseSelectionComponent;
    let fixture: ComponentFixture<LinkCaseSelectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LinkCaseSelectionComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkCaseSelectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
