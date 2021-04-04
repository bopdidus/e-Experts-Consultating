import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberExpertDetailComponent } from './subscriber-expert-detail.component';

describe('SubscriberExpertDetailComponent', () => {
  let component: SubscriberExpertDetailComponent;
  let fixture: ComponentFixture<SubscriberExpertDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberExpertDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberExpertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
