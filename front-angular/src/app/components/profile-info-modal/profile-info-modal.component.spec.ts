import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoModalComponent } from './profile-info-modal.component';

describe('ProfileInfoModalComponent', () => {
  let component: ProfileInfoModalComponent;
  let fixture: ComponentFixture<ProfileInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
