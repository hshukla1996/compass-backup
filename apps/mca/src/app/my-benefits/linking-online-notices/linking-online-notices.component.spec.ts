import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkingOnlineNoticesComponent } from './linking-online-notices.component';
 

describe('LinkingOnlineNoticesComponent', () => {
    let component: LinkingOnlineNoticesComponent;
    let fixture: ComponentFixture<LinkingOnlineNoticesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LinkingOnlineNoticesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkingOnlineNoticesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
