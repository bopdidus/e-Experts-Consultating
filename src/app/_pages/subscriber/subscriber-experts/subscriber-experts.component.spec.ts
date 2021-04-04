import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberExpertsComponent } from './subscriber-experts.component';

describe('SubscriberExpertsComponent', () => {
  let component: SubscriberExpertsComponent;
  let fixture: ComponentFixture<SubscriberExpertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberExpertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
